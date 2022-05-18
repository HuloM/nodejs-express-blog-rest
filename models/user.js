const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {timestamps: true})

userSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id
        ret.name = ret.first_name + ' ' + ret.last_name
        delete ret._id
        delete ret.__v
        delete ret.password
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.posts
        delete ret.email
        delete ret.first_name
        delete ret.last_name
        return ret
    }
}

module.exports = mongoose.model('User', userSchema)