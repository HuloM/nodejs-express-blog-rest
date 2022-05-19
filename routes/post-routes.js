const express = require('express')

const postsController = require('../controllers/post-controller')
const authenticate = require('../middleware/authenticate')
const {body, check} = require('express-validator')
const User = require('../models/user')

const router = express.Router()

router.get('/posts/:page', postsController.getPosts)

router.get('/post/:postId', postsController.getPost)

router.post('/posts',
    body('title').isLength({min: 15}).trim(),
    body('body').isLength({min: 25}).trim(),
    check('image')
        .custom((value, {req}) => {
            return req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg'
        })
        .withMessage('incorrect file type submitted (accepted: PNG, JPG, JPEG)'),
    authenticate, postsController.postPost)

router.put('/post/:postId',
    body('title').isLength({min: 15}).trim(),
    body('body').isLength({min: 25}).trim(),
    check('image').optional({ nullable: true })
        .custom((value, {req}) => {
            return req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg'
        })
        .withMessage('incorrect file type submitted (accepted: PNG, JPG, JPEG)'),
    authenticate, postsController.updatePost)

router.delete('/post/:postId',authenticate, postsController.deletePost)

router.post('/post/comments/:postId',
    body('comment').isLength({min: 15}).trim(),
    authenticate, postsController.postComment)

module.exports = router