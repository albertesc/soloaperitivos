import { getAllRecipes } from '../../lib/recipes'

export default (req, res) => {
  const allRecipes = getAllRecipes(['title', 'slug', 'coverImage'])

  const results = req.query.q
    ? allRecipes.filter(recipe => recipe.title.toLowerCase().includes(req.query.q))
    : []
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(results))
}
