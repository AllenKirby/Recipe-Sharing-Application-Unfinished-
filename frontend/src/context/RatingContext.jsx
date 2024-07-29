import { createContext, useReducer } from "react";
import PropTypes from 'prop-types'

export const RatingContext = createContext()
export const ratingReducer = (state, action) => {
    switch (action.type) {  
        case 'SET_RATING':
            return {
                ratings: action.payload
            }
        case 'CREATE_RATING':
            return {
                ratings: [action.payload, ...state.ratings]
            }
        case 'UPDATE_RATING':
            return {
                ...state,
                ratings: state.ratings.map(rating => 
                    rating._id === action.payload._id ? action.payload : rating
                )
            }
        case 'DELETE_RATING':
            return {
                ...state,
                ratings: state.ratings.filter(w => w._id !== action.payload._id)
            };
        default:
            return state
    }
}
export const RatingContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ratingReducer, {
        ratings: null
    })

    return(
        <RatingContext.Provider value={{...state, dispatch}}>
            {children}
        </RatingContext.Provider>
    )
}

RatingContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}