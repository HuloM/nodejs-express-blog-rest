const express = require('express')

const postsController = require('../controllers/post-controller')
const authenticate = require('../middleware/authenticate')
const {body, check} = require('express-validator')

const router = express.Router()

router.get('/posts/:page', postsController.getPosts)

router.get('/post/:postId', postsController.getPost)

router.post('/posts',
    body('title').isLength({min: 15}).trim()
        .withMessage('Title is too short, min: 15 characters'),
    body('body').isLength({min: 25}).trim()
        .withMessage('Body is too short, min: 25 characters'),
    check('image')
        .custom((value, {req}) => {
            return req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg'
        })
        .withMessage('incorrect file type submitted (accepted: PNG, JPG, JPEG)'),
    authenticate, postsController.postPost)

router.put('/post/:postId',
    body('title').isLength({min: 15}).trim().optional({ nullable: true })
        .withMessage('Title is too short, min: 15 characters'),
    body('body').isLength({min: 25}).trim().optional({ nullable: true })
        .withMessage('Body is too short, min: 25 characters'),
    check('image').optional({ nullable: true })
        .custom((value, {req}) => {
            return req.file === undefined || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg'
        })
        .withMessage('incorrect file type submitted (accepted: PNG, JPG, JPEG)'),
    authenticate, postsController.updatePost)

router.delete('/post/:postId',authenticate, postsController.deletePost)

router.post('/post/comments/:postId',
    body('comment').isLength({min: 15}).trim()
        .withMessage('Comment is too short, min: 15 characters'),
    authenticate, postsController.postComment)

module.exports = router