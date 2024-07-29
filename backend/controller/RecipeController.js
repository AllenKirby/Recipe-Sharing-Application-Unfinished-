const RecipeModel = require('../model/RecipeModel')
const mongoose = require('mongoose')

//recipe
const addNewRecipe = async(req, res) => {
    const {title, ingredients, directions} = req.body
    const recipeImage = req.file.path

    try{
        const user_id = req.user._id
        const recipes = await RecipeModel.create({title, ingredients: JSON.parse(ingredients), directions: JSON.parse(directions), user_id, image: recipeImage})
        res.status(200).json(recipes)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getAllRecipes = async(req, res) => {
    try{
        const recipes = await RecipeModel.find().populate('user_id', 'firstname lastname').sort({createdAt: -1})

        res.status(200).json(recipes)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
const getUser_id = async(req, res) => {
    const user_id = req.user._id

    try {
        res.status(200).json(user_id)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}
const deleteRecipe = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: ' No such recipe'})
    }

    try {
        const del = await RecipeModel.findByIdAndDelete({_id: id})

        if (!del){
            return res.status(400).json({error: 'No such recipe'})
        }

        res.status(200).json(del)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getSingleRecipe = async(req, res) => {
    const { id } = req.params

    try{
        const recipe = await RecipeModel.findById(id)

        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, ingredients, directions } = req.body;
        const user_id = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such recipe' });
        }

        const existingRecipe = await RecipeModel.findById(id);

        if (!existingRecipe) {
            return res.status(404).json({ error: 'No such recipe' });
        }

        const updateFields = {
            title: title || existingRecipe.title,
            ingredients: ingredients ? JSON.parse(ingredients) : existingRecipe.ingredients,
            directions: directions ? JSON.parse(directions) : existingRecipe.directions,
            user_id: user_id,
            image: req.file ? req.file.path : existingRecipe.image
        };

        const recipe = await RecipeModel.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//reviews
const addReviews = async(req, res) => {
    try{
        const { recipe_id } = req.params
        const user_id = req.user._id
        const { rate, review } = req.body

        const newReview = {
            user_id: mongoose.Types.ObjectId(user_id),
            rate,
            review
        };

        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            recipe_id,
            { $push: { reviews: newReview } },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedRecipe);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    addNewRecipe,
    getAllRecipes,
    getUser_id,
    deleteRecipe,
    getSingleRecipe,
    updateRecipe,
    addReviews
}