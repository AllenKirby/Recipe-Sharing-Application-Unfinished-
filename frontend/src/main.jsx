import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { RecipeContextProvider } from './context/RecipeContext.jsx'
import { RatingContextProvider } from './context/RatingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RatingContextProvider>
    <RecipeContextProvider> 
      <AuthContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      </AuthContextProvider>
    </RecipeContextProvider>
  </RatingContextProvider>
)
