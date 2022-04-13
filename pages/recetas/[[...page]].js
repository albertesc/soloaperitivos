import Layout from '../../components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import RecipesList from '../../components/RecipesList'
import { getAllRecipes, getAllRecipesPaginated } from '../../lib/recipes'
import SearchForm from '../../components/SearchForm'
import Pagination from '../../components/Pagination'

const RECIPES_PER_PAGE = 3

export default function Recipes ({ paginatedRecipes, nextPage, prevPage, currentPage, totalRecipes }) {
  const hasNextPage = Math.ceil(totalRecipes / RECIPES_PER_PAGE) > currentPage
  const hasPreviousPage = currentPage > 1

  return (
    <>
      <Head>
        <title>Solo Aperitivos | Recetas</title>
      </Head>

      <Layout>
        <div className='container max-w-4xl z-0 lg:z-10 relative'>
          <div className='flex items-end w-full relative'>
            <div className='flex-none mr-6 opacity-30 lg:opacity-100 absolute lg:relative'>
              <Image src='/images/recipes-chef.svg' alt='Recetas de aperitivos y cocina' width={340} height={300} />
            </div>
            <div className='flex-shrink w-full mb-28 z-10'>
              <h1 className='text-2xl mb-6'>Buscar Recetas</h1>
              <SearchForm />
            </div>
          </div>
        </div>
        <div className='-mt-[56px] bg-[#CC5B4B] h-64 z-10 lg:z-0 relative' />
        <div className='container max-w-4xl pb-24 -mt-48 md:-mt-32 z-10 lg:z-0 relative'>
          <RecipesList recipes={paginatedRecipes} />
          <Pagination
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const currentPage = params.page || 1
  const nextPage = parseInt(currentPage) + 1
  const prevPage = parseInt(currentPage) - 1

  const { paginatedRecipes, totalRecipes } = getAllRecipesPaginated([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags'
  ], currentPage, RECIPES_PER_PAGE)

  return {
    props: {
      paginatedRecipes,
      nextPage,
      prevPage,
      currentPage,
      totalRecipes
    }
  }
}

export const getStaticPaths = async () => {
  const pages = Math.ceil(getAllRecipes().length / RECIPES_PER_PAGE)
  const paths = Array.from(Array(pages).keys()).map((page) => ({
    params: { page: Array(String(page + 1)).map(page => page) }
  }))
  paths.push({ params: { page: [] } })

  return {
    paths,
    fallback: false
  }
}
