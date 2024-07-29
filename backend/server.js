require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRoutes = require('./routes/UserRoutes')
const RecipesRoutes = require('./routes/RecipesRoutes')
const path = require('path')

const app = express()

app.use(cors())

//middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
   next() 
})

app.use('/api/user', UserRoutes)
app.use('/api/recipes', RecipesRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Listening to port", process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})