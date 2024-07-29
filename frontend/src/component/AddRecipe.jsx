import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import { useAuthContext } from "../hooks/useAuthContext";
import Save from "./Save";
import { useRecipeContext } from '../hooks/useRecipeContext';
import PropTypes from 'prop-types';

const AddRecipe = ({ isModalOpen, flag, recipe = {} }) => {
  const [saveFlag, setSaveFlag] = useState(false);
  const [ingredients, setIngredients] = useState(['']);
  const [directions, setDirections] = useState(['']);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useRecipeContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png, .jpeg, .jpg';
    input.required = true;
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    });
    input.click();
  };

  useEffect(() => {
    if (recipe._id) {
      setTitle(recipe.title || '');
      setImage(recipe.image ? `http://localhost:4000/${recipe.image}` : null);
      setIngredients(recipe.ingredients || ['']);
      setDirections(recipe.directions || ['']);
    }
  }, [recipe]);

  const addInput = (type) => {
    if (type === "ingredients") {
      setIngredients([...ingredients, '']);
    } else if (type === "directions") {
      setDirections([...directions, '']);
    }
  };

  const handleInputChange = (type, index, event) => {
    if (type === "ingredients") {
      const newInputs = [...ingredients];
      newInputs[index] = event.target.value;
      setIngredients(newInputs);
    } else if (type === "directions") {
      const newDirections = [...directions];
      newDirections[index] = event.target.value;
      setDirections(newDirections);
    }
  };

  const deleteInput = (type, index) => {
    if (type === "ingredients") {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    } else if (type === "directions") {
      const newDirections = [...directions];
      newDirections.splice(index, 1);
      setDirections(newDirections);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('directions', JSON.stringify(directions));
    if (image) formData.append('image', image);

    if (!user || !user.token) {
      console.error("User not authenticated");
      return;
    }
    try {
      const res = await axios.post('http://localhost:4000/api/recipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (res.status === 200) {
        resetState();
        setIsLoading(false)
        console.log("New Recipe Added", res.data);
        dispatch({ type: 'CREATE_RECIPES', payload: res.data });
        setSaveFlag(true);
        setTimeout(() => {
          setSaveFlag(false);
          isModalOpen();
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false)
      setError(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsLoading(true)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('directions', JSON.stringify(directions));
    if (image) formData.append('image', image);

    if (!user || !user.token) {
      console.error("User not authenticated");
      return;
    }
    try {
      const res = await axios.patch(`http://localhost:4000/api/recipes/${recipe._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (res.status === 200) {
        resetState();
        setIsLoading(false)
        console.log("Recipe Updated", res.data);
        dispatch({ type: 'UPDATE_RECIPE', payload: res.data });
        setSaveFlag(true);
        setTimeout(() => {
          setSaveFlag(false);
          isModalOpen('edit');
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false)
      setError(error);
    }
  };

  const resetState = () => {
    setError(null);
    setTitle('');
    setImage(null);
    setIngredients(['']);
    setDirections(['']);
  };

  return (
    <section className="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center">
      <form onSubmit={flag ? handleSubmit : handleUpdate} className="w-1/4 h-auto p-4 rounded-md bg-white shadow-background shadow-lg">
        <p className="text-center font-semibold text-xl">{flag ? 'New Recipe' : 'Edit Recipe'}</p>
        <div className="w-full max-h-96 overflow-auto">
          <div className="w-full h-auto py-2">
            <input type="text" required placeholder="Write a Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-1 text-md my-2 border-2 border-gray-300 rounded-md" />
            {image && <img className="my-2 rounded-md" src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="RecipeImage" />}
            <button type="button" onClick={uploadImage} className="w-full h-auto flex items-center justify-center py-4 border-2 border-fonts rounded-md font-semibold hover:bg-fonts hover:text-white transition-all duration-200 z-10">
              <LuUpload className="mr-2" />Upload Image
            </button>
          </div>
          <hr />
          <div className="w-full h-auto py-2">
            <p className="font-semibold text-md">Ingredients</p>
            <p className="font-semibold text-sm my-2">Create list of ingredients for the recipe</p>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="w-full flex">
                <input
                  type="text"
                  required
                  value={ingredient}
                  onChange={(e) => handleInputChange("ingredients", index, e)}
                  className="w-full p-1 text-md my-2 border-2 border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => deleteInput("ingredients", index)}
                  className="my-2 ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-200"
                >
                  <MdOutlineDelete color="white" />
                </button>
              </div>
            ))}
            <div className="w-full h-auto py-1 flex items-center justify-center">
              <button
                type="button"
                onClick={() => addInput("ingredients")}
                className="w-auto px-4 py-2 rounded hover:scale-110 hover:bg-fonts hover:text-white transition-all duration"
              >
                Add next Ingredients
              </button>
            </div>
          </div>
          <hr />
          <div className="w-full h-auto py-2">
            <p className="font-semibold text-md">Directions</p>
            <p className="font-semibold text-sm my-2">Describe the instructions for your recipe</p>
            {directions.map((direction, index) => (
              <div key={index} className="w-full flex">
                <input
                  type="text"
                  required
                  value={direction}
                  onChange={(e) => handleInputChange("directions", index, e)}
                  className="w-full p-1 text-md my-2 border-2 border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => deleteInput("directions", index)}
                  className="my-2 ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-200"
                >
                  <MdOutlineDelete color="white" />
                </button>
              </div>
            ))}
            <div className="w-full h-auto py-1 flex items-center justify-center">
              <button
                type="button"
                onClick={() => addInput("directions")}
                className="w-auto px-4 py-2 rounded hover:scale-110 hover:bg-fonts hover:text-white transition-all duration"
              >
                Add next Direction
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-auto py-2 flex items-center justify-between px-10">
          <button onClick={flag ? isModalOpen : () => isModalOpen('edit')} className="w-auto px-4 py-2 rounded hover:scale-110 transition-all duration">Back</button>
          <button disabled={isLoading} type="submit" className="w-auto px-7 py-2 bg-fonts text-white rounded hover:scale-110 transition-all duration">Save</button>
        </div>
        {error && (
          <div className="w-full text-center mt-3 py-2 border-2 border-red-600">
            <p className="text-red-600 text-md">{error.message}</p>
          </div>
        )}
      </form>
      {saveFlag && <Save message={flag ? "New Recipe Added" : "Recipe Updated"} />}
    </section>
  );
};

AddRecipe.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  flag: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    directions: PropTypes.arrayOf(PropTypes.string)
  })
};

export default AddRecipe;
