const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const postRoutes = require('./routes/post-routes')
const userRoutes = require('./routes/user-routes')
const multer = require('./middleware/multerSetup')

const MONGODB_URI = process.env.MONGODB_HOST

const app = express()

app.use(express.json())
app.use(cors())
// able to get images from localhost:8080/images/<image file> without publicly exposing the directory public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')))

// configuring express app to use multer, and only accept a single file upload per request
app.use(multer)

app.use(postRoutes)
app.use(userRoutes)

// default error handler for express
app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})
// node --max-old-space-size=2048 app.js
// connects to the mongoDB db and if successful will start up server
mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('Server Active')
        app.listen(8080)
    })
    .catch(err => console.log(err))