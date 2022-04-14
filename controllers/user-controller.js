const bcrypt = require('bcryptjs')

const User = require("../models/user")

exports.signup = async (req, res, next) => {
    try {
        const username = req.body.username
        const email = req.body.email

        const userExists = await User.findOne({email: email})

        if (userExists)
            return res.status(422).json({
                message: `user with email: ${email} already exists`,
            })

        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        if (password !== confirmPassword)
            return res.status(422).json({
                message: 'passwords must match',
            })
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
        res.status(201).json({
            message: 'user has been logged in',
            user: {id: user._id, username: user.username},
        })
    } catch (err) {
        console.log(err)
    }
}

