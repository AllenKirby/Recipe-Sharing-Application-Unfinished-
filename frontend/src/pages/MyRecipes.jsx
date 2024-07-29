import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useRecipeContext } from '../hooks/useRecipeContext'
import RecipeDetails from '../component/RecipeDetails'


const MyRecipes = () => {
  const { user } = useAuthContext()
  const [userId, setUserId] = useState(null)
  const { recipes } = useRecipeContext()
  useEffect(() => {
    const fetchID = async () => {
      if (!user || !user.token) {
        console.error("User not authenticated");
        return;
      }
      const res = await axios.get('http://localhost:4000/api/recipes/user_id', {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
      })
      if (res.status === 200){
        const json = res.data
        setUserId(json)
      }
    }
    fetchID()
  }, [user])

  const filteredRecipes = userId ? recipes.filter((recipe) => recipe.user_id?._id === userId) : []
  return (
    <section className="w-full h-96 px-20 overflow-auto">
      {filteredRecipes.map((recipe) => (
        <RecipeDetails key={recipe._id} recipes={recipe} deleteFlag={true}/>
      ))}
    </section>
  )
}

export default MyRecipes