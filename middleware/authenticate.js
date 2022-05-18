const jwt = require('jsonwebtoken')
require('dotenv').config()

const {throwError} = require('../util/errorHandler')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        throwError('not authenticated', 401)
    }
    let decodedToken
    try {
        decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET_KEY)
    } catch (err) {
        throwError(err, 500)
    }
    req.userId = decodedToken.user.id
    next()
}