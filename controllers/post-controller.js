const path = require("path")
const {unlink} = require("fs")

const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const {throwError} = require('../util/errorHandler')

exports.getPosts = async (req, res, next) => {
    try {

        // . find() is a method that mongoose creates for its schemas (returns all documents by default)
        const posts = await Post.find()
            // populate() grabs the related data to the reference collection
            // here we are grabbing the user document that belongs to the post
            .populate('author')

        posts.map((post) => {
            // mapping out data I don't want the front-end to have
            post.author = {
                _id: post.author._id,
                username: post.author.username,
            }
            post.comments = undefined
            return post
        })

        res.status(200).json({
            posts: posts
        })

    } catch (err) {
        throwError(err, 500)
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)
            .populate('author')
            .populate('comments')
        post.author = {
            _id: post.author._id,
            username: post.author.username,
        }
        res.status(200).json({
            post: post
        })
    } catch (err) {
        throwError(err, 500)
    }
}

exports.postPost = async (req, res, next) => {
    try {
        // multer or json parse will put related data onto req.body
        const title = req.body.title
        const body = req.body.body
        // multer grabs the image and puts it onto the req.file object
        const image = req.file.path.replace("\\", "/")

        const userId = req.userId
        const author = await User.findById(userId)

        if (!author)
            return res.status(422).json({
                message: 'user not found'
            })

        const post = await new Post({
            title: title,
            body: body,
            imageUrl: image,
            author: author._id,
        }).save()

        author.posts.push()
        await author.save()

        res.status(201).json({
            message: 'Post Created Successfully',
            post: post,
        })
    } catch (err) {
        throwError(err, 500)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const userId = req.userId
        const post = await Post.findById(postId)

        if (post.author.toString() !== userId)
            return res.status(401).json({
                message: 'user is not author of post'
            })

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
        throwError(err, 500)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const userId = req.userId
        const post = await Post.findById(postId)

        if (post.author.toString() !== userId)
            return res.status(401).json({
                message: 'user is not author of post'
            })

        clearImage(post.imageUrl)

        await Post.deleteOne({_id: postId})

        res.status(200).json({
            message: 'Post deleted',
            post: post
        })
    } catch (err) {
        throwError(err, 500)
    }
}

exports.postComment = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const userId = req.userId
        const commentBody = req.body.comment
        const post = await Post.findById(postId)

        if (!post)
            return res.status(404).json({
                message: 'post not found'
            })

        const comment = await new Comment({
            comment: commentBody,
            post: postId,
            author: userId
        }).save()
        post.comments.push(comment)
        await post.save()
        res.status(200).json({
            message: 'comment created',
            comment: comment,
            postId: postId
        })
    } catch (err) {
        throwError(err, 500)
    }
}

const clearImage = async imagePath => {
    let filePath = path.join(__dirname, '..', imagePath)
    await unlink(filePath, err => {
        if (err)
            throwError(err, 500)
    })
}