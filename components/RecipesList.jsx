import RecipeVerticalCard from './RecipeCardVertical'
import RecipeHorizontalCard from './RecipeCardHorizontal'

export default function RecipesList ({ recipes }) {
  return (
    <>
      <div className='flex flex-wrap -mx-3'>
        {
          recipes.map((recipe, key) => {
            if (key === 0) {
              return (
                <div key={recipe.slug} className='w-full sm:w-1/2 md:w-full px-3 mb-6'>
                  <RecipeHorizontalCard excerpt recipe={recipe} />
                </div>
              )
            }

            if (key === 1 || key === 2) {
              return (
                <div key={recipe.slug} className='w-full sm:w-1/2 lg:w-1/2 px-3 mb-6'>
                  <RecipeVerticalCard excerpt recipe={recipe} />
                </div>
              )
            }

            return (
              <div key={recipe.slug} className='w-full sm:w-1/2 lg:w-1/4 px-3 mb-6'>
                <RecipeVerticalCard recipe={recipe} />
              </div>
            )
          })
        }
      </div>
    </>
  )
}
