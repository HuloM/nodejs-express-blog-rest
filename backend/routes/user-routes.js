const express = require('express')
const {body} = require('express-validator')

const userController = require('../controllers/user-controller')
const User = require('../models/user')

const router = express.Router()

router.put('/signup',
    body('email').isEmail().custom((value, {req}) => {
        return User.findOne({email: value}).then(user => {
            if (user)
                return Promise.reject(`user with email: ${value} already exists`)
        })
    }),
    body('username').isLength({min: 8}).trim()
        .withMessage('Username too short, min: 8 characters'),
    body('password').isLength({min: 8, max: 40}).trim()
        .withMessage('password length must be between 8 and 40 characters'),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('passwords must match')
        }
        // Indicates the success of this synchronous custom validator
        return true
    }), userController.signup)

router.post('/login', userController.login)

module.exports = router