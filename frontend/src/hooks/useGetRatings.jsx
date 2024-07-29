import axios from 'axios'
import { useAuthContext } from './useAuthContext'

export const useGetRatings = () => {
    const { user } = useAuthContext()

  const getrating = async() => {
        try{
            const res = await axios.get(`http://localhost:4000/api/recipeRating/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if(res.status === 200){
                return res.data
            }
        }
        catch(error){
            console.log(error)
        }
    }
  return { getrating }
}
