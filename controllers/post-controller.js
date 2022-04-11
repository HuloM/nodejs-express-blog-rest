const Post = require('../models/post')

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate('author')
        res.status(200).json({
            posts: posts
        })
    } catch (err) {
        console.log(err)
    }
}

exports.postPost = async (req, res, next) => {
    try {
        const title = req.body.title
        const body = req.body.body

        const post = await new Post({
            title: title,
            body: body,
            imageUrl: '',
            creator: null,
        }).save()
        res.status(201).json({
            message: 'Post Created Successfully',
            post: post,
        })
    } catch (err) {
        console.log(err)
    }
}