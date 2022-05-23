const path = require("path")
const {unlink} = require("fs")

const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const {throwError} = require('../util/errorHandler')
const {validationResult} = require('express-validator')

const POSTS_PER_PAGE = 3

exports.getPosts = async (req, res, next) => {
    try {
        const page = +req.params.page || 1
        // . find() is a method that mongoose creates for its schemas (returns all documents by default)
        const totalItems = await Post.find().countDocuments()
        const posts = await Post.find()
            // populate() grabs the related data to the reference collection
            // here we are grabbing the user document that belongs to the post
            .skip((page - 1) * POSTS_PER_PAGE)
            // limit 3 posts per page
            .limit(POSTS_PER_PAGE)
            .populate('author')

        posts.forEach((post) => {
            // mapping out data I don't want the front-end to have
            post.comments = undefined
            post.body = undefined
            post.imageUrl = undefined
            return post
        })
        res.status(200).json({
            message: 'Posts Retrieved Successfully',
            posts: posts,
            totalPages: Math.ceil(totalItems / POSTS_PER_PAGE)
        })
    } catch (err) {
        return throwError(err, 500, next)
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId

        const post = await Post.findById(postId)
            .populate('author')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author'
                }
            })

        if (!post)
            return throwError('post not found', 404, next)

        res.status(200).json({
            message: 'Post retrieved Successfully',
            post: post
        })
    } catch (err) {
        return throwError(err, 500, next)
    }
}

exports.postPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // multer or json parse will put related data onto req.body
        const title = req.body.title
        const body = req.body.body
        // multer grabs the image and puts it onto the req.file object
        const image = req.file.path.replace("\\", "/").replace('public', '')

        const userId = req.userId
        const author = await User.findById(userId)

        if (!author)
            return throwError('user not found', 404, next)

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
        throwError(err, 500, next)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const userId = req.userId
        const author = await User.findById(userId)

        if (!author)
            return throwError('user not found', 404, next)

        const postId = req.params.postId
        const post = await Post.findById(postId)
            .populate('author')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author'
                }
            })

        if (!post)
            return throwError('post not found', 404, next)
        if (post.author._id.toString() !== userId)
            return throwError('user is not author of post', 401, next)

        // if multer parsed info then grab that if not then grab post elements
        const title = req.body.title || post.title
        const body = req.body.body || post.body
        let imageUrl = req.body.image || post.imageUrl
        if (req.file) {
            imageUrl = req.file.path.replace("\\", "/").replace('public', '')
        }
        // remove old image if it was updated to a new image
        if (imageUrl !== post.imageUrl)
            clearImage(post.imageUrl, next)

        post.title = title
        post.body = body
        post.imageUrl = imageUrl

        await post.save()

        res.status(200).json({
            message: 'Post Updated Successfully',
            post: post,
        })
    } catch (err) {
        throwError(err, 500, next)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const userId = req.userId
        const author = await User.findById(userId)

        if (!author)
            return throwError('user not found', 404, next)

        const postId = req.params.postId
        const post = await Post.findById(postId)

        if (!post)
            return throwError('post not found', 404, next)
        if (post.author.toString() !== userId)
            return throwError('user is not author of post', 401, next)

        await clearImage(post.imageUrl, next)

        await Post.deleteOne({_id: postId})

        res.status(200).json({
            message: 'Post Deleted Successfully',
            post: post
        })
    } catch (err) {
        return throwError(err, 500, next)
    }
}

exports.postComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const postId = req.params.postId
        const userId = req.userId
        const commentBody = req.body.comment
        const post = await Post.findById(postId)

        if (!post)
            return throwError('post not found', 404, next)

        const comment = await new Comment({
            comment: commentBody,
            post: postId,
            author: userId
        }).save()

        post.comments.push(comment)
        await post.save()

        res.status(200).json({
            message: 'Comment Created Successfully',
            comment: comment,
            postId: postId
        })
    } catch (err) {
        throwError(err, 500, next)
    }
}

const clearImage = async (imagePath, next) => {
    let filePath = path.join(__dirname, '..', 'public' + imagePath)
    await unlink(filePath, err => {
        if (err)
            throwError(err, 500, next)
    })
}