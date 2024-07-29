const UserModel = require('../model/UserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async(req, res) => {
    const {username, password} = req.body

    try{
        const user = await UserModel.login(username, password)

        const token = createToken(user._id)

        res.status(200).json({username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const signupUser = async(req, res) => {
    const {firstname, lastname, email, username, password} = req.body
    try {
        const user = await UserModel.signup(firstname, lastname, email, username, password)

        const token = createToken(user._id)

        res.status(200).json({username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const addFavorites = async(req, res) => {
    const { id } = req.body

    try {
        const user_id = req.user._id
        const favorites = await UserModel.findByIdAndUpdate(user_id, {$addToSet: {favorites: id}},{new: true})
        
        res.status(200).json(favorites)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}
const removeFavorite = async(req, res) => {
    const { id } = req.params
    const user_id = req.user._id
    try {
        const favorites = await UserModel.findByIdAndUpdate(user_id, {$pull: {favorites: id}}, {new: true})
        res.status(200).json(favorites)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

const getProfile = async(req, res) => {
    const user_id = req.user._id
    try {
        const profile = await UserModel.findById(user_id)
        
        res.status(200).json(profile)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser,
    addFavorites,
    removeFavorite,
    getProfile
}
