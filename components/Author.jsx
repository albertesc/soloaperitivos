import Image from 'next/image'

const dateFormat = (date, locale, options) => {
  const formatDate = new Date(date)
  return new Intl.DateTimeFormat(locale, options).format(formatDate)
}

export default function Author ({ author, date, avatar }) {
  const dateRecipe = dateFormat(date, 'es', { dateStyle: 'long' })

  return (
    <div className='flex items-center'>
      <div className='overflow-hidden rounded-full text-[0px]'>
        <Image src={avatar} quality={100} width={40} height={40} />
      </div>

      <div className='ml-4 text-xs'>
        <strong className='block'>{author}</strong>
        <span className='block text-[10px]'>{dateRecipe}</span>
      </div>
    </div>
  )
}
