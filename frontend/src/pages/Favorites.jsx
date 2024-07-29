import { useEffect, useState } from "react"
import { useGetProfile } from '../hooks/useGetProfile'
import { useRecipeContext } from '../hooks/useRecipeContext'
import RecipeDetails from "../component/RecipeDetails"

const Favorites = () => {
  const { getProfile } = useGetProfile()
  const { recipes } = useRecipeContext()
  const [favoritesId, setFavoritesId] = useState([])

  useEffect(() => {
    const checkFavorites = async() => {
      const favoriteIds = await getProfile()
      setFavoritesId(favoriteIds || [])
    }
    checkFavorites()
  }, [getProfile, recipes])

  const filteredRecipes = recipes.filter((recipe) => favoritesId.includes(recipe._id))

  return (
    <section className="w-full h-96 px-20 overflow-auto">
      {filteredRecipes.map((favorite) => (
        <RecipeDetails key={favorite._id} recipes={favorite} deleteFlag={false}/>
      ))}
    </section>
  )
}

export default Favorites