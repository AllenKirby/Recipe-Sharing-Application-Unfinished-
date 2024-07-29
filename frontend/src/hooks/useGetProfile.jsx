import { useCallback } from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"

export const useGetProfile = () => {
  const { user } = useAuthContext()

  const getProfile = useCallback(async () => {
    if (!user) return []

    try {
      const res = await axios.get('http://localhost:4000/api/user/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      return res.data.favorites
    } catch (error) {
      console.error(error)
      return []
    }
  }, [user])

  return { getProfile }
}
