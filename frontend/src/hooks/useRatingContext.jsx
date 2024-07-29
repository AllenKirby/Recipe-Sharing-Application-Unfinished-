import { RatingContext } from '../context/RatingContext'
import { useContext } from "react";

export const useRatingContext = () =>{
    const context = useContext(RatingContext)

    if(!context){
        throw Error('RatingContext is not found.')
    }
    return context
}