import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const {login, isLoading, error} = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(data)
  }

  

  return (
    <section className="w-full h-80 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-7 rounded-lg shadow-background shadow-lg mt-52">
        <p className="text-3xl my-3 font-bold text-center">LOGIN</p>
        <div className="w-full h-auto flex flex-col">
          <input type="text" required placeholder="Username" className="w-full p-2 text-lg my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setData({...data, username: e.target.value})}/>
          <input type="password" required placeholder="Password" className="w-full p-2 text-lg my-1 border-2 border-gray-300 rounded-md" onChange={(e) => setData({...data, password: e.target.value})}/>
        </div>
        <button disabled={isLoading} type="submit" className="w-full bg-fonts text-white mt-4 py-3 rounded-lg text-xl font-medium hover:-translate-y-4 transition-all duration-150">Login</button>
        {error && (
            <div className="w-full text-center mt-3 py-3 border-2 border-red-600">
              <p className="text-red-600 text-lg">{error}</p>
            </div>)}
      </form>
    </section>  
  )
}
export default Login 
