const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_HOST

const app = express()

app.use(express.json())

mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('Server Active')
        app.listen(8080)
    })
    .catch(err => console.log(err))