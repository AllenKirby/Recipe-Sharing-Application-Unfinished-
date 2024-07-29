import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRecipeContext } from "../hooks/useRecipeContext";
import RootLayout from '../layout/RootLayout';
import Frontpage from "./frontpage";
import Login from "../AuthComponent/login";
import Signup from "../AuthComponent/signup";
import Homepage from './homepage';
import BrowseRecipe from "./BrowseRecipe";
import MyRecipes from "./MyRecipes";
import Favorites from "./Favorites";
import NotFoundpage from "./404page";
import ErrorPage from "./ErrorPage";
import ViewRecipe from "./ViewRecipe";
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

const Mainpage = () => {
  const { user, dispatch } = useAuthContext();
  const { dispatch: recipeDispatch } = useRecipeContext();

  useEffect(() => {
    const checkToken = () => {
      const decodedToken = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) { 
        dispatch({ type: 'LOGOUT' });
        recipeDispatch({ type: 'SET_RECIPES', payload: null });
      }
    };

    if (user) {
      checkToken();
    }
  }, [user, dispatch, recipeDispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={!user ? <Frontpage /> : <Navigate to='/home/recipes' />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path="/home" element={user ? <Homepage /> : <Navigate to='/' />}>
          <Route index element={<Navigate to="recipes" />} />
          <Route path="recipes" element={<BrowseRecipe />} />
          <Route path="myrecipes" element={<MyRecipes />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path=":id" element={<ViewRecipe />} />
        </Route>
        <Route path="*" element={<NotFoundpage />} />
      </Route>
    )
  );

  return (
    <main className="w-full h-screen relative font-poppins text-fonts">
      <RouterProvider router={router} />
    </main>
  );
};

export default Mainpage;
