const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const multer = require('multer')
const cors = require('cors')
const postRoutes = require('./routes/post-routes')
const userRoutes = require('./routes/user-routes')

const MONGODB_URI = process.env.MONGODB_HOST

const app = express()

const storage = multer.diskStorage({
    // setting file upload destination to public/images from project root dir
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    // setting up custom file names to not overwrite existing files with exact same names
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = file.originalname.replace('public/', '')
        cb(null, uniqueSuffix + '-' + filename)
    }
})
// check if file is of type png, jpg, or jpeg
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        cb(null, true)
    else
        cb(null, false)
}

app.use(express.json())
app.use(cors())
// able to get images from localhost:8080/images/<image file> without publicly exposing the directory public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')))
// configuring express app to use multer with the settings setup above, and only accept a single file upload per request
app.use(multer({storage: storage, fileFilter: fileFilter }).single('image'))

app.use(postRoutes)
app.use(userRoutes)

// default error handler for express
app.use((error, req, res, next) => {
    console.log(error)
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