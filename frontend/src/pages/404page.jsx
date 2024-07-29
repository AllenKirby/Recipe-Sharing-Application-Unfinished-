import { Link } from "react-router-dom"

const NotFoundpage = () => {
  return (
    <main className="absolute top-0 z-10 w-full h-screen flex items-center justify-center">
        <div className="w-auto h-auto text-center">
            <p className="font-bold text-3xl">404 | Page Not Found</p>
            <Link to='/home'>Click here to go back home</Link>
        </div>
    </main>
  )
}

export default NotFoundpage