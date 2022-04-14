import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { getRecipeBySlug, getAllRecipes } from '../../lib/recipes'
import markdownToHtml from '../../lib/markdownToHtml'
import Layout from '../../components/Layout'
import SearchForm from '../../components/SearchForm'
import Image from 'next/image'
import Link from 'next/link'
import Author from '../../components/Author'
import Tags from '../../components/Tags'
import Duratioin from '../../components/Duration'

export default function Recipe ({ recipe, nextRecipe, prevRecipe }) {
  const router = useRouter()
  const { title, date, author, content, ogImage, coverImage, ingredients, tags, duration } = recipe

  if (!router.isFallback && !recipe?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Solo Aperitivos</title>
      </Head>

      <Layout>
        <div className='bg-[#CC5B4B]'>
          <div className='container w-full lg:max-w-4xl mx-auto'>
            <div className='flex items-center w-full'>
              <div className='flex-shrink w-full -mr-48 md:-mr-10 z-20'>
                <h1 className='text-2xl mb-6 text-white'>Buscar Recetas</h1>
                <SearchForm />
              </div>
              <div className='opacity-50 md:opacity-100 flex-none mr-6 text-[0px] -mt-6'>
                <Image src='/images/recipe-chef.svg' alt='Recetas de aperitivos y cocina' width={277} height={206} />
              </div>
            </div>
          </div>
        </div>

        {router.isFallback
          ? (
            <span>Loading...</span>
            )
          : (
            <article className='pb-32 pt-10'>
              <Head>
                <title>{title} | Solo Aperitivos</title>
                <meta property='og:image' content={ogImage.url} />
              </Head>

              <div className='container w-full lg:max-w-4xl mx-auto'>
                <div className='flex justify-between mb-8'>
                  {prevRecipe && (
                    <div className='flex items-center justify-start w-full'>
                      <Link href={`/receta/${prevRecipe}`}>
                        <a className='text-[#CC5B4B] font-semibold tracking-wide flex items-center text-sm lg:text-base'>
                          <svg className='w-4 h-4 mr-3 rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 5l7 7-7 7M5 5l7 7-7 7' /></svg>
                          Anterior receta
                        </a>
                      </Link>
                    </div>
                  )}
                  {nextRecipe && (
                    <div className='flex items-center justify-end w-full'>
                      <Link href={`/receta/${nextRecipe}`}>
                        <a className='text-[#CC5B4B] font-semibold tracking-wide flex items-center text-sm lg:text-base'>
                          Siguiente receta
                          <svg className='w-4 h-4 ml-3' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 5l7 7-7 7M5 5l7 7-7 7' /></svg>
                        </a>
                      </Link>
                    </div>
                  )}
                </div>

                <h1 className='text-3xl lg:text-5xl mb-6'>{title}</h1>
                <div className='flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-10 mb-10'>
                  <Author author={author.name} date={date} avatar={author.picture} />
                  <Tags tags={tags} />
                  <Duratioin duration={duration} />
                </div>
              </div>

              <div className='container w-full lg:max-w-4xl mx-auto prose'>
                <div className='flex flex-col-reverse md:flex-row items-start justify-between md:space-x-10 mb-10'>
                  <div className='w-full md:w-4/12'>
                    <strong className='block mb-4'>Ingredientes</strong>
                    <ul className='mb-8 space-y-4'>
                      {ingredients.map((ingredient, key) => <li key={key} className='italic'>{ingredient}</li>)}
                    </ul>
                  </div>
                  <div className='lg:ml-8 mb-6 overflow-hidden rounded-lg text-[0px] img-cover'>
                    <Image src={coverImage} quality={80} width={476} height={411} className='object-cover' />
                  </div>
                </div>
              </div>

              <div className='container w-full lg:max-w-4xl mx-auto prose prose-headings:font-normal prose-a:text-[#CC5B4B] prose-a:font-bold' dangerouslySetInnerHTML={{ __html: content }} />
            </article>
            )}
      </Layout>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const recipes = getAllRecipes(['date', 'slug'])
  const recipe = getRecipeBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'ingredients',
    'tags',
    'duration'
  ])
  const content = await markdownToHtml(recipe.content || '')

  const nextRecipeIndex = recipes.map(e => e.date).indexOf(recipe.date) + 1
  const prevRecipeIndex = recipes.map(e => e.date).indexOf(recipe.date) - 1

  const nextRecipe = nextRecipeIndex < recipes.length
    ? recipes[nextRecipeIndex].slug
    : null

  const prevRecipe = prevRecipeIndex >= 0
    ? recipes[prevRecipeIndex].slug
    : null

  return {
    props: {
      recipe: {
        ...recipe,
        content
      },
      nextRecipe,
      prevRecipe
    }
  }
}

export async function getStaticPaths () {
  const recipes = getAllRecipes(['slug'])

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          slug: recipe.slug
        }
      }
    }),
    fallback: false
  }
}
