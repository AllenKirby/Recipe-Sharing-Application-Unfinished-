import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from "axios"

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async(signupData, repeatpass) => {
        setIsLoading(true)
        setError(null)

    if(signupData.password !== repeatpass){
      setIsLoading(false)
      setError("Password doesn't match")
      return
    }
    try{
      const res = await axios.post('http://localhost:4000/api/user/signup', signupData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = res.data
        if(res.status === 200){
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    catch(error){
      setIsLoading(false)
      setError(error.response.data.error);
        }
    }  
    return {signup, isLoading, error}
}