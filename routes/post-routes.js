const express = require('express')

const postsController = require('../controllers/post-controller')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/posts/:page', postsController.getPosts)

router.get('/post/:postId', postsController.getPost)

router.post('/posts', authenticate, postsController.postPost)

router.put('/post/:postId',authenticate, postsController.updatePost)

router.delete('/post/:postId',authenticate, postsController.deletePost)

router.post('/post/comments/:postId', authenticate, postsController.postComment)

module.exports = router