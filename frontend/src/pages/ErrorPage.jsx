import { Link, useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError()

  return (
    <main className="absolute top-0 z-10 w-full h-screen flex items-center justify-center">
        <div className="w-auto h-auto text-center">
            <p className="font-bold text-3xl">{error}</p>
            <Link to='/home'>Click here to go back home</Link>
        </div>
    </main>
  )
}

export default ErrorPage