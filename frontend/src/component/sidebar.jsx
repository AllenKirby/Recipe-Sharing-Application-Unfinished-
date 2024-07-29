import { NavLink } from "react-router-dom"

import { PiBrowsersBold } from "react-icons/pi";
import { AiOutlineBook } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";

const Sidebar = () => {
  return (
    <> 
        <aside className="w-1/5 h-32 bg-gray-200 rounded-md flex flex-col p-2"> 
            <NavLink className='w-full text-md pl-4 mt-1 flex hover:bg-fonts hover:text-white transition-all duration-75 rounded-md py-1' to='recipes'><PiBrowsersBold className="mt-1 mr-2" />Browse Recipes</NavLink>
            <NavLink className='w-full text-md pl-4 mt-1 flex hover:bg-fonts hover:text-white transition-all duration-75 rounded-md py-1' to='myrecipes'><AiOutlineBook className="mt-1 mr-2" />My Recipes</NavLink>
            <NavLink className='w-full text-md pl-4 mt-1 flex hover:bg-fonts hover:text-white transition-all duration-75 rounded-md py-1' to='favorites'><MdFavoriteBorder className="mt-1 mr-2"/>Favorites</NavLink>
        </aside>
    </>
  )
}
export default Sidebar
