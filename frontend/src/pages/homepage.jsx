import { Outlet } from "react-router-dom"
import Sidebar from "../component/sidebar"
import AddRecipe from "../component/AddRecipe"
import { useState } from "react"

const Homepage = () => {
  const [flag, setFlag] = useState(false)

  const isModalOpen = () => {
    setFlag(!flag)
  }
  return (
    <section className="w-full h-auto flex p-3">
      <Sidebar/>
      <section className="w-1/2 max-h-full mx-3 rounded-md">
        <div className="w-full h-auto p-2 flex items-center justify-between">
          <input type="text" placeholder="Search Recipes..." className="w-1/2 p-1 text-md my-1 border-2 border-gray-300 rounded-xl"/>
          <button onClick={isModalOpen} className="px-4 py-2 text-white text-md rounded-md bg-fonts hover:-translate-y-4 transition-all duration-150">Add Recipe</button>
        </div>
        <div className="w-full h-auto">
          <Outlet/>
        </div>
        {flag && <AddRecipe isModalOpen={isModalOpen} flag={true}/>}
      </section>
    </section>
  )
}
export default Homepage
