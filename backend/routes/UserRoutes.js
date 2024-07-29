const express = require('express')

const router = express.Router()
const {
    signupUser,
    loginUser,
    addFavorites,
    removeFavorite,
    getProfile
} = require('../controller/UserController')
const requireAuth = require('../middleware/requireAuth')

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.use(requireAuth) 
router.post('/favorites', addFavorites)
router.delete('/favorites/:id', removeFavorite)
router.get('/', getProfile)

module.exports = router