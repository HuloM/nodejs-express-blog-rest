const express = require('express')
const {body} = require('express-validator')

const userController = require('../controllers/user-controller')
const User = require('../models/user')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.put('/signup',
    body('email').isEmail().custom((value, { req }) => {
        return User.findOne({email: value}).then(user => {
            if (user)
                return Promise.reject(`user with email: ${value} already exists`)
        })
    }).normalizeEmail(),
    body('username').isLength({min: 8}).trim(),
    body('password').isLength({min: 8, max: 40}).trim(),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('passwords must match');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }), userController.signup)

router.post('/login', userController.login)

router.delete('/user', authenticate, userController.deleteUser)

module.exports = router