const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

commentSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id
        delete ret.post
        delete ret.updatedAt
        delete ret._id
        delete ret.__v
        return ret
    }
}
module.exports = mongoose.model('Comment', commentSchema)