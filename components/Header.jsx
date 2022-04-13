import Image from 'next/image'
import Link from 'next/link'

export default function Header () {
  return (
    <header>
      <div className='container h-24'>
        <div className='flex items-center justify-between h-full'>
          <Link href='/'>
            <a>
              <Image src='/images/logo.svg' alt='Recetas de aperitivos y codina' width={140} height='45' />
            </a>
          </Link>

          <nav className='flex align-center space-x-12'>
            <Link href='/recetas'>
              <a className=''>Recetas</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
