import {NavLink, Outlet} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const RootLayout = () => {
    const {user} = useAuthContext()
    const { logout } = useLogout()

    const handleLogout = async () => {
        logout()
    }

  return (
    <>
        <header className='w-full h-auto py-3 px-20 flex items-center justify-between'>
            <div className='p-3'>
                <NavLink to='/' className='text-2xl text-name font-bold'>RecipeRealm</NavLink>
            </div>
            {user && (
                <div className='w-auto h-auto p-2 flex items-center justify-center'>
                    <p className='text-lg font-medium mr-5'>Hello! {user.username}</p>
                    <button onClick={handleLogout} className='w-auto h-auto py-2 px-4 rounded-md bg-fonts text-white hover:-translate-y-4 transition-all duration-150'>Logout</button>
                </div>)}
            {!user && (
                <nav className='p-3'>
                <ul>
                    <NavLink className='text-lg font-medium px-4 p-3 mx-1 bg-fonts text-white rounded-md' to='/login'>Login</NavLink>
                    <NavLink className='text-lg font-medium px-4 p-3 mx-1' to='/signup'>Signup</NavLink>
                </ul>
            </nav>)}
        </header>
        <section className='w-full h-96'>
            <Outlet/>
        </section>
    </>
  )
}
export default RootLayout
