import Image from 'next/image'
import Link from 'next/link'
import Tags from './Tags'
import Author from './Author'

export default function RecipeHorizontalCard ({ recipe, excerpt }) {
  const { coverImage, title, author, date, slug, tags } = recipe

  return (
    <Link href={`/receta/${slug}`}>
      <div className='cursor-pointer flex flex-col md:flex-row h-full bg-white overflow-hidden rounded-lg transition shadow-xl hover:scale-[1.025] hover:shadow-2xl'>
        <div className='w-full md:w-6/12 mr-5 h-full sm:h-auto md:h-full overflow-hidden text-[0px] rounded-lg img-cover'>
          <Image src={coverImage} width={412} height={298} layout='responsive' quality={80} className='block align-bottom leading-[0] object-cover w-full h-full' />
        </div>
        <div className='flex flex-col flex-grow inset-0 w-full md:w-6/12 p-5 md:p-7 md:pl-2'>
          <Tags tags={tags} />

          <h3 className='mt-4 mb-4 text-lg leading-snug'>{title}</h3>

          {excerpt && <p className='text-[14px] mb-8'>{recipe.excerpt}</p>}

          <div className='mt-auto'>
            <Author author={author.name} date={date} avatar={author.picture} />
          </div>
        </div>
      </div>
    </Link>
  )
}
