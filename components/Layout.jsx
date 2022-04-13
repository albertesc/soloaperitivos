import Header from './Header'
import Meta from './Meta'

export default function Layout ({ children }) {
  return (
    <>
      <Meta />

      <div className='bg-gradient-to-br from-[#FDD7C2] via-[#FEFAF1] to-[#FDEADB] min-h-screen'>
        <Header />

        <main>
          {children}
        </main>
      </div>
    </>
  )
}
