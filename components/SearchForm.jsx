/* global fetch */
/* eslint no-undef: "error" */

import { useState, useRef, useMemo } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchForm (props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(() => createAutocomplete({
    placeholder: 'Puedes buscar por ingrediente o plato',
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [{
      sourceId: 'recipes',
      getItemUrl ({ item }) {
        return `/receta/${item.slug}`
      },
      getItems: async ({ query }) => {
        if (query) {
          const res = await fetch(`/api/search?q=${query}`)
          return await res.json()
        }
      }
    }],
    navigator: {
      navigate ({ itemUrl }) {
        window.location.assign(itemUrl)
      },
      navigateNewTab ({ itemUrl }) {
        const windowReference = window.open(itemUrl, '_blank', 'noopener')

        if (windowReference) {
          windowReference.focus()
        }
      },
      navigateNewWindow ({ itemUrl }) {
        window.open(itemUrl, '_blank', 'noopener')
      }
    },
    ...props
  }), [props])

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  return (
    <div className='relative' {...autocomplete.getRootProps({})}>
      <form className='flex' ref={formRef} {...autocomplete.getFormProps({ inputElement: inputRef.current })}>
        <input type='text' ref={inputRef} {...autocomplete.getInputProps({})} className='placeholder:text-gray-300 w-full flex-shrink px-4 py-2.5 rounded-md shadow-2xl border border-gray-50 focus:outline-none appearance-none' />
        {autocompleteState.isOpen && (
          <div className='' ref={panelRef} {...autocomplete.getPanelProps({})}>
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection

              return (
                <section key={`source-${index}`}>
                  {items.length > 0 && (
                    <ul key={index} {...autocomplete.getListProps()} className='absolute flex flex-col divide-y divide-gray-200 top-full left-0 w-full bg-white rounded-lg overflow-hidden mt-2 shadow-xl'>
                      {items.map((item, index) => (
                        <li className='search-option flex space-x-2 items-center p-2' key={index} {...autocomplete.getItemProps({ item, source })}>
                          <Image src={item.coverImage} width={48} height={48} alt={item.title} quality={80} className='block align-bottom leading-[0] object-cover w-full h-full rounded-md' />
                          <Link href={`/receta/${item.slug}`}>
                            <a className='block px-4 py-2 hover:bg-gray-100'>
                              {item.title}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </form>
    </div>
  )
}
