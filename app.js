const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const multer = require('multer')

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
        cb(null, uniqueSuffix + '-' + file.originalname)
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
// able to get images from localhost:8080/images/<image file> without publicly exposing the directory public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')))
// configuring express app to use multer with the settings setup above, and only accept a single file upload per request
app.use(multer({storage: storage, fileFilter: fileFilter }).single('image'))

app.use(postRoutes)
app.use(userRoutes)

// connects to the mongoDB db and if successful will start up server
mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('Server Active')
        app.listen(8080)
    })
    .catch(err => console.log(err))