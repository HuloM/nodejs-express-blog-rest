exports.nextError = (err, errorCode, next) => {
    if (err.statusCode)
        err.statusCode = errorCode
    next(err)
}

exports.throwError = (err, errorCode) => {
    const error = new Error(err)
    error.statusCode = errorCode
    throw error
}