import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { MdFavoriteBorder, MdFavorite, MdOutlineDelete } from "react-icons/md"; 
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext';
import { useGetProfile } from '../hooks/useGetProfile'; 
import { useRecipeContext } from '../hooks/useRecipeContext'
import Save from './Save';
import { useNavigate } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const RecipeDetails = ({ recipes, deleteFlag }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const { user } = useAuthContext()
  const { getProfile } = useGetProfile()
  const { dispatch } = useRecipeContext()
  const navigate = useNavigate()
  const [ratings, setRatings] = useState(5)

   /*const computeRating = (ratings) => {
      if (ratings.length > 0) {
        let sum = 0;
        for (let i = 0; i < ratings.length; i++) {
          sum += ratings[i];
        }
        const average = sum / ratings.length;
        return Math.round(average)
      } else {
        return 0
      }
   }*/

  /*const getRating = useCallback(async () => {
    try {
      const recipeRatings = await getrating();
      const filteredRatings = recipeRatings ? recipeRatings.filter((recipeRating) => recipeRating.recipe_id?._id === recipeRating._id) : []
      //if (filteredRatings) {
        console.log(recipeRatings)
        //const ratesArray = res.map(rating => rating.rate);
        //const average = computeRating(ratesArray)
        //console.log('Average Rating:', average);
        //setRatings(average)
      //}
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setRatings(0);
    }
  }, [getrating]);*/

  useEffect(() => {
    const checkFavorites = async() => {
      const json = await getProfile();
      if (json.includes(recipes._id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
    if (user) {
      checkFavorites();
    }
  }, [user, getProfile, recipes._id]);

  const handleFavorite = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/favorites', { id: recipes._id }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      
      if (res.status === 200) {
        console.log('Added to favorites', res.data)
        setIsFavorite(true)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const removeFavorite = async () => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/user/favorites/${recipes._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      
      if (res.status === 200) {
        console.log('Favorite removed', res.data)
        setIsFavorite(false)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const deleteRecipe = async () => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/recipes/${recipes._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (res.status === 200) {
        console.log('Recipe deleted', res.data)
        dispatch({ type: 'DELETE_RECIPE', payload: res.data })
        setShowSaveMessage(true)
        setTimeout(() => {
          setShowSaveMessage(false)
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const viewRecipe = () => {
    navigate(`/home/${recipes._id}`)
  }

  return (
    <section className='w-full rounded-md h-auto border-2 border-background my-3'>
      <img onClick={viewRecipe} className='w-full h-auto rounded-t-md cursor-pointer' src={`http://localhost:4000/${recipes.image}`} alt={recipes.title} />
      <div className='w-full p-3'>
        
        <p className='text-2xl font-bold'>{recipes.title}</p>
          <ReactStars
            count={5}
            size={20}
            onChange={setRatings}
            value={ratings}
            activeColor="#ffd700"
            edit={false}
                /> 
        <div className='flex items-start justify-between'>
          <div className='w-auto h-auto'>
            <p className='text-sm font-light'>{formatDistanceToNow(new Date(recipes.createdAt), { addSuffix: true })}</p>
          </div>
          <div className='w-auto h-auto flex'>
            {isFavorite ? <MdFavorite onClick={removeFavorite} className='cursor-pointer' size={25} /> : <MdFavoriteBorder onClick={handleFavorite} className='cursor-pointer' size={25} />}
            {deleteFlag && <MdOutlineDelete onClick={deleteRecipe} className='cursor-pointer' size={25} color='red' />}
          </div>
          {showSaveMessage && <Save message="Recipe Deleted" />}
        </div>
      </div>
    </section>
  )
}

RecipeDetails.propTypes = {
  recipes: PropTypes.object.isRequired,
  deleteFlag: PropTypes.bool.isRequired
}

export default RecipeDetails
