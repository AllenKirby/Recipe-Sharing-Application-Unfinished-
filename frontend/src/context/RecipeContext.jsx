import { createContext, useReducer } from "react";
import PropTypes from 'prop-types'

export const RecipeContext = createContext()
export const recipeReducer = (state, action) => {
    switch (action.type) {  
        case 'SET_RECIPES':
            return {
                recipes: action.payload
            }
        case 'CREATE_RECIPES':
            return {
                recipes: [action.payload, ...state.recipes]
            }
        case 'UPDATE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.map(recipe => 
                    recipe._id === action.payload._id ? action.payload : recipe
                )
            }
        case 'DELETE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter(w => w._id !== action.payload._id)
            };
        default:
            return state
    }
}
export const RecipeContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(recipeReducer, {
        recipes: null
    })

    return(
        <RecipeContext.Provider value={{...state, dispatch}}>
            {children}
        </RecipeContext.Provider>
    )
}

RecipeContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}