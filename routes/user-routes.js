const express = require('express')
const userController = require('../controllers/user-controller')

const router = express.Router()

router.put('/signup', userController.signup)

router.post('/login')

router.put('/user')

router.delete('/user')

module.exports = router