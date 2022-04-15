exports.throwError = (err, errorCode, next) => {
    const error = new Error(err)
    error.statusCode = errorCode
    if (next)
        next(error)
    else
        throw error
}