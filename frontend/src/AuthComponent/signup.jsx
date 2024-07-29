import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [data, setData] = useState({
    firstname: '', 
    lastname: '', 
    email: '', 
    username: '', 
    password: ''
  })
  const [repeatPass, setRepeatPass] = useState('')
  const {signup, isLoading, error} = useSignup()

  const handleSubmit = async(e) => {
    e.preventDefault()

    await signup(data, repeatPass)
  }

    return (
      <section className="w-full h-80 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="p-7 rounded-lg shadow-background shadow-lg mt-52">
          <p className="text-3xl font-bold text-center my-3">SIGNUP</p>
          <div className="w-full h-auto">
            <input type="text" required placeholder="Firstname" className="mr-1 p-2 text-md my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setData({...data, firstname: e.target.value})}/>
            <input type="text" required placeholder="Lastname" className="ml-1 p-2 text-md my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setData({...data, lastname: e.target.value})}/>
          </div>
          <div className="flex flex-col">
            <input type="email" required placeholder="Email" className=" p-2 text-md my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setData({...data, email: e.target.value})}/>
            <p className="text-xl font-semibold mt-3">Setup your Account</p>
            <input type="text" required placeholder="Username" className=" p-2 text-md my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setData({...data, username: e.target.value})}/>
            <input type="password" required placeholder="Password" className=" p-2 text-md my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setData({...data, password: e.target.value})}/>
            <input type="password" required placeholder="Repeat Password" className=" p-2 text-md my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setRepeatPass(e.target.value)}/>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-fonts text-white mt-4 py-3 rounded-lg text-xl font-medium hover:-translate-y-4 transition-all duration-150">Signup</button>
          {error && (
            <div className="w-full text-center py-3 border-2 border-red-600">
              <p className="text-red-600 text-lg">{error}</p>
            </div>)}
        </form>
      </section>
    )
  }
  export default Signup
  