import { getLastRecipes, getFeaturedRecipes } from '../lib/recipes'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'
import RecipeHorizontalCard from '../components/RecipeCardHorizontal'
import RecipesList from '../components/RecipesList'
import Link from 'next/link'

export default function Index ({ lastRecipes, featuredRecipes }) {
  return (
    <>
      <Head>
        <title>Solo Aperitivos</title>
      </Head>

      <Layout>
        <div className='container flex items-center justify-between mt-12 mb-12 lg:mb-0 relative z-0 lg:z-10'>
          <div className='flex-shrink mb-24 relative z-10'>
            <h1 className='text-4xl lg:text-5xl mb-6'>Recetas de aperitivos y mucho más ...</h1>
            <p className='mb-16'>Si quieres aprender a hacer tus ricos aperitivos aquí encontraras recetas para que tu y los tuyos podais disfrutar.</p>

            <SearchForm />
          </div>

          <div className='flex-none opacity-20 lg:opacity-100 absolute lg:relative right-0 lg:-ml-32 xl:ml-0 xl:pl-20 z-0'>
            <Image src='/images/home-chef.svg' alt='Recetas de aperitivos y cocina' width={592} height={570} />
          </div>
        </div>

        <div className='z-10 lg:z-0 relative'>
          <div className='-mt-[98px] bg-[#CC5B4B] h-64 py-12'>
            <div className='container lg:max-w-5xl'>
              <h2 className='text-3xl text-white tracking-wide'>Últimas recetas</h2>
            </div>
          </div>

          <div className='container lg:max-w-5xl pb-24 -mt-32'>
            <div className='flex flex-wrap -mx-3'>
              {
                lastRecipes.map(recipe => (
                  <div key={recipe.slug} className='w-full sm:w-1/2 md:w-full lg:w-1/2 px-3 cursor-pointer mb-6'>
                    <RecipeHorizontalCard recipe={recipe} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='container lg:max-w-4xl pb-24'>
          <h2 className='text-center mb-16 text-3xl'>Las recetas más populares</h2>
          <RecipesList recipes={featuredRecipes} />

          <div className='flex justify-end mt-8'>
            <Link href='/recetas'>
              <a className='text-[#CC5B4B] font-semibold tracking-wide flex items-center'>
                Más recetas
                <svg className='w-4 h-4 ml-3' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 5l7 7-7 7M5 5l7 7-7 7' /></svg>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps () {
  const lastRecipes = getLastRecipes(2, [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags'
  ])

  const featuredRecipes = getFeaturedRecipes(7, [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'featured',
    'tags'
  ])

  return {
    props: { lastRecipes, featuredRecipes }
  }
}
