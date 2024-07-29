const express = require('express')
const multer  = require('multer')

const router = express.Router()
const {
    addNewRecipe,
    getAllRecipes,
    getUser_id,
    deleteRecipe,
    getSingleRecipe,
    updateRecipe,
    addReviews
} = require('../controller/RecipeController')

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth) 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
//recipe
router.post('/', upload.single("image"), addNewRecipe)
router.patch('/:id', upload.single("image"), updateRecipe)
router.get('/', getAllRecipes)
router.get('/user_id', getUser_id)
router.delete('/:id', deleteRecipe)
router.get('/:id', getSingleRecipe)

//review
router.patch('/:recipe_id', addReviews)

module.exports = router