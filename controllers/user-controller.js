const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require("express-validator")
require('dotenv').config()

const User = require("../models/user")

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const username = req.body.username
        const email = req.body.email
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const password = req.body.password

        // hashing password with 12 rounds of salting
        const hashedPass = await bcrypt.hash(password, 12)
        const user = await new User({
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPass
        }).save()
        res.status(201).json({
            message: 'user has been signed up',
            user: {id: user._id, username: user.username},
        })
    } catch (err) {
        console.log(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        // since username is not unique we don't want to check for username as we will get more than one
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({email: email})
        if (!user)
            return res.status(422).json({
                message: `user with email: ${email} not found`,
            })

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch)
            return res.status(422).json({
                message: 'incorrect password',
            })
        // https://jwt.io/ can visually see decoded tokens here by copy-pasting the response token you get
        const token = jwt.sign({
            user: {id: user._id, username: user.username}
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

        res.status(201).json({
            message: 'user has been logged in',
            token: token
        })
    } catch (err) {
        console.log(err)
    }
}

