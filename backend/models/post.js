const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        // required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {timestamps: true})

postSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.updatedAt
        return ret
    }
}

module.exports = mongoose.model('Post', postSchema)