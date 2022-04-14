import { getAllRecipes } from '../../lib/recipes'

export default (req, res) => {
  const allRecipes = getAllRecipes(['title', 'slug', 'coverImage'])

  const { q } = req.query

  if (q) {
    const results = allRecipes.filter(recipe => {
      const { title } = recipe
      return title.toLowerCase().includes(q.toLowerCase())
    })
    return res.status(200).json(results)
  }

  res.status(400).json()
}
