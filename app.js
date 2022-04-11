const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const postRoutes = require('./routes/post-routes')

const MONGODB_URI = process.env.MONGODB_HOST

const app = express()

app.use(express.json())

app.use(postRoutes)

mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('Server Active')
        app.listen(8080)
    })
    .catch(err => console.log(err))