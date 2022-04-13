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

        const user = await new User({
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password // password will be hashed later
        }).save()
        res.status(201).json({
            message: 'user has been signed up',
            user: {id: user._id, username: user.username},
        })
    } catch (err) {
        console.log(err)
    }
}