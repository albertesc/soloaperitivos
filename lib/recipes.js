import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const recipesDirectory = join(process.cwd(), '_recipes')

export function getRecipeSlugs () {
  return fs.readdirSync(recipesDirectory)
}

export function getRecipeBySlug (slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(recipesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllRecipes (fields = []) {
  const slugs = getRecipeSlugs()
  const recipes = slugs
    .map((slug) => getRecipeBySlug(slug, fields))
    .sort((recipe1, recipe2) => (recipe1.date > recipe2.date ? -1 : 1))
  return recipes
}

export function getAllRecipesPaginated (fields = [], page, perPage) {
  const allRecipes = getAllRecipes(fields)
  const totalRecipes = allRecipes.length
  const currentPage = page || 1
  const paginatedRecipes = allRecipes.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  return {
    totalRecipes,
    paginatedRecipes
  }
}

export function getLastRecipes (numberOfRecipes, fields = []) {
  const slugs = getRecipeSlugs()
  const recipes = slugs
    .map((slug) => getRecipeBySlug(slug, fields))
    .slice(-numberOfRecipes)
    .reverse()
  return recipes
}

export function getFeaturedRecipes (numberOfRecipes, fields = []) {
  const slugs = getRecipeSlugs()
  const recipes = slugs
    .map((slug) => getRecipeBySlug(slug, fields))
    .filter((recipe) => recipe.featured)
    .slice(-numberOfRecipes)
    .sort((recipe1, recipe2) => (recipe1.date > recipe2.date ? -1 : 1))
  return recipes
}

export function getSearchRecipes (word, fields = []) {
  const slugs = getRecipeSlugs()
  const recipes = slugs
    .map((slug) => getRecipeBySlug(slug, fields))
    .find((recipe) => recipe.title.includes(word))
    .sort((recipe1, recipe2) => (recipe1.date > recipe2.date ? -1 : 1))
  return recipes
}
