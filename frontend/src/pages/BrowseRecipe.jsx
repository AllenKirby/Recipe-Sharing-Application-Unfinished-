import axios from "axios"
import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useRecipeContext } from "../hooks/useRecipeContext"
import RecipeDetails from "../component/RecipeDetails"

const BrowseRecipe = () => {
  const { user } = useAuthContext()
  const { recipes, dispatch } = useRecipeContext()

  useEffect(()=> {

    const fetchRecipes = async()=> {
      if (!user || !user.token) {
        console.error("User not authenticated");
        return;
      }
      const res = await axios.get('http://localhost:4000/api/recipes/', {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
      })
      if (res.status === 200){
        const json = res.data
        dispatch({type: 'SET_RECIPES', payload: json})
      }
    }
    fetchRecipes()
  }, [user, dispatch])
  return (
    <section className="w-full h-96 px-20 overflow-auto">
      {recipes && recipes.map((recipe)=> (
        <RecipeDetails 
          key={recipe._id} 
          recipes={recipe}
          deleteFlag={false}/>
      ))}
    </section>
  )
}
export default BrowseRecipe
