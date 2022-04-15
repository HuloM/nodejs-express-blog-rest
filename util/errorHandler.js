exports.nextError = (next, err, errorCode) => {
    if (err.statusCode)
        err.statusCode = errorCode
    next(err)
}

exports.throwError = (err, errorCode) => {
    const error = new Error(err)
    error.statusCode = errorCode
    throw error
}