const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ratingSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: false
    }
}, {timestamps: true})

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    directions: {
        type: [String], 
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true 
    },
    reviews: [ratingSchema]
}, {timestamps: true})

module.exports = mongoose.model('Recipes', recipeSchema)