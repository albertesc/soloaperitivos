import Link from 'next/link'

export default function Pagination ({ color, hasNextPage, hasPreviousPage, nextPage, prevPage }) {
  color === 'light' ? color = 'text-white' : color = 'text-[#CC5B4B]'

  return (
    <div className='flex items-center justify-between mt-12'>
      {hasPreviousPage && (
        <div className='flex items-center justify-start w-full'>
          <Link href={`/recetas/${prevPage}`}>
            <a className={`${color} font-semibold tracking-wide flex items-center`}>
              <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 19l-7-7 7-7m8 14l-7-7 7-7' /></svg>
              Anteriores recetas
            </a>
          </Link>
        </div>
      )}
      {hasNextPage && (
        <div className='flex items-center justify-end w-full'>
          <Link href={`/recetas/${nextPage}`}>
            <a className={`${color} font-semibold tracking-wide flex items-center`}>
              Más recetas
              <svg className='w-4 h-4 ml-3' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 5l7 7-7 7M5 5l7 7-7 7' /></svg>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
