const Post = require('../models/post')
const path = require("path")
const {unlink} = require("fs")

exports.getPosts = async (req, res, next) => {
    try {
        // . find() is a method that mongoose creates for it's schemas (returns all documents by default)
        const posts = await Post.find()
            // populate() grabs the related data to the reference collection
            // here we are grabbing the user document that belongs to the post
            .populate('author')
        res.status(200).json({
            posts: posts
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)
        res.status(200).json({
            post: post
        })
    } catch (err) {
        console.log(err)
    }
}

exports.postPost = async (req, res, next) => {
    try {
        // multer or json parse will put related data onto req.body
        const title = req.body.title
        const body = req.body.body
        // multer grabs the image and puts it onto the req.file object
        const image = req.file.path.replace("\\", "/")

        const post = await new Post({
            title: title,
            body: body,
            imageUrl: image,
            author: null,
        }).save()
        res.status(201).json({
            message: 'Post Created Successfully',
            post: post,
        })
    } catch (err) {
        console.log(err)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.postId

        const post = await Post.findById(postId)
        // if multer parsed info then grab that if not then grab post elements
        const title = req.body.title || post.title
        const body = req.body.body || post.body
        let imageUrl = req.body.image || post.imageUrl
        if (req.file) {
            imageUrl = req.file.path.replace("\\", "/")
        }
        // remove old image if it was updated to a new image
        if (imageUrl !== post.imageUrl)
            clearImage(post.imageUrl)

        post.title = title
        post.body = body
        post.imageUrl = imageUrl

        await post.save()

        res.status(200).json({
            message: 'Post updated',
            post: post,
        })
    } catch (err) {
        console.log(err)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.body.postId
        const post = await Post.findById(postId)

        clearImage(post.imageUrl)

        await Post.deleteOne({_id: postId})

        res.status(200).json({
            message: 'Post deleted',
            post: post
        })
    } catch (err) {
        console.log(err)
    }
}

const clearImage = imagePath => {
    let filePath = path.join(__dirname, '..', imagePath)
    unlink(filePath, err => console.log(err))
}