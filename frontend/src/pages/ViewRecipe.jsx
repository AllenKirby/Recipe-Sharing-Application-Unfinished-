import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useAuthContext } from "../hooks/useAuthContext"
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import AddRecipe from "../component/AddRecipe";
import { useRecipeContext } from "../hooks/useRecipeContext";
import RateRecipe from "../component/RateRecipe";

const ViewRecipe = () => {
    const {id} = useParams()
    const [recipe, setRecipe] = useState('')
    const { user } = useAuthContext()
    const [flag, setFlag ] = useState(false)
    const [rateFlag, setRateFlag] = useState(false)
    const { recipes } = useRecipeContext()

    useEffect(()=>{
        const getSingleRecipe = async() => {
            try{
                const res = await axios.get(`http://localhost:4000/api/recipes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if(res.status === 200){
                    const json = res.data
                    setRecipe(json)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        if(user){
            getSingleRecipe()
        }
    }, [id, user, recipes ])

    const back = () => {
        window.history.back()
    }
    const openModal = (type) => {
        switch(type){
            case 'edit':
                setFlag(!flag)
                break
            case 'review':
                setRateFlag(!rateFlag)
                break
            default:
                return
        }
    }

  return (
    <section className="w-full rounded-md max-h-96 overflow-auto border-2 border-background my-3">
        <div className="w-full h-auto p-4 flex">
            <div className="w-1/3 px-3 flex items-center justify-start">
                <button onClick={back} className="rounded-full"><IoIosArrowBack size={30} /></button>
            </div>
            <div className="text-center w-1/3">
                <p className="text-2xl font-semibold">{recipe.title}</p>
            </div>
            <div className="w-1/3 px-3 flex items-center justify-end">
                <button onClick={() => openModal('edit')}><MdModeEdit size={25} /></button>
            </div>
        </div>
        <img className='w-full h-auto' src={`http://localhost:4000/${recipe.image}`} alt={recipe.title} />
        <div className="w-full h-auto py-2 flex items-center justify-center">
            <ReactStars
                count={5}
                value={4}
                size={40}
                activeColor="#ffd700"
                edit={false}
                color="#e4e5e9"
            />
        </div>
        <hr />
        <div className="w-full h-auto p-7">
            <p className="text-xl font-semibold">Ingredients</p>
            <ul className="flex flex-col list-disc px-10 pt-5">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li className="my-1 text-justify" key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
        <hr />
        <div className="w-full h-auto p-7">
            <p className="text-xl font-semibold">Directions</p>
            <ul className="flex flex-col px-9 pt-5">
                {recipe.directions && recipe.directions.map((direction, index) => (
                    <li className="my-1 text-justify font-medium" key={index}>Step {index + 1}. <span className="font-extralight pl-10">{direction}</span></li>
                ))}
            </ul>
        </div>
        <hr />
            <div className="w-full h-auto flex items-center justify-center py-2">
                <button onClick={() => openModal('review')} className="px-5 w-auto h-auto py-2 flex hover:bg-fonts hover:text-white transition-all duration-300 rounded-md"><span className="mr-1"><BiMessageRounded size={25} /></span>Write a review</button>
            </div>
        <hr />
        <div className="w-full h-auto py-4 text-center">
            <p className="text-2xl font-semibold">ENJOY YOUR MEAL!</p>
        </div>
        {flag && <AddRecipe isModalOpen={openModal}  flag={false} recipe={recipe}/>}
        {rateFlag && <RateRecipe isModalOpen={openModal} recipe_id={recipe._id}/>}
    </section>
  )
}

export default ViewRecipe