import { IoIosArrowBack } from "react-icons/io";
import ReactStars from "react-rating-stars-component";
import Save from './Save'

import PropTypes from 'prop-types'
import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'

const RateRecipe = ({isModalOpen, recipe_id}) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const { user } = useAuthContext()
    const [saveFlag, setSaveFlag] = useState(false)
    const [ isloading, setIsLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()

        setIsLoading(true)
        try{
            const rates = {  rate: rating, review }

            const res = await axios.patch(`http://localhost:4000/api/recipes/${recipe_id}`, rates, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if(res.status === 200){
                const json = res.data
                console.log(json)
                setSaveFlag(true)
                setTimeout(() => {
                    setSaveFlag(false)
                    setIsLoading(false)
                    isModalOpen('review')
                }, 2000);
            }
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <section className="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-1/3 h-auto p-4 rounded-md bg-white shadow-background shadow-lg">
            <div className="w-full px-2 flex">
                <div className="w-1/3 px-3 flex items-center justify-start">
                    <button onClick={() => isModalOpen('review')} className="rounded-full"><IoIosArrowBack size={25} /></button>
                </div>
                <div className="text-center w-1/3">
                    <p className="text-md font-semibold">Rate the Recipe</p>
                </div>
                <div className="w-1/3 px-3 flex items-center justify-end">
                    <button disabled={isloading} type="submit">Save</button>
                </div>
            </div>
            <div className="text-center w-full py-3">
                <p className="text-sm">Have you prepared a dish? <br /> Share your opinion!</p>
            </div>
            <div className="w-full h-auto flex items-center justify-center">
                <ReactStars
                    count={5}
                    size={50}
                    onChange={setRating}
                    value={rating}
                    activeColor="#ffd700"
                />
            </div>
            <div className="w-full">
                <textarea 
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write a Review" 
                className="w-full p-2 rounded-md border-2 border-slate-500"></textarea>
            </div>
        </form>
        {saveFlag && <Save message="Review Saved"/>}
    </section>
  )
}

RateRecipe.propTypes = {
    isModalOpen: PropTypes.func.isRequired,
    recipe_id: PropTypes.string.isRequired
  };
  

export default RateRecipe