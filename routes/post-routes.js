const express = require('express')

const postsController = require('../controllers/post-controller')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/posts/:page', postsController.getPosts)

router.get('/post/:postId', postsController.getPost)

router.post('/posts',authenticate, postsController.postPost)

router.put('/posts/:postId',authenticate, postsController.updatePost)

router.delete('/posts/:postId',authenticate, postsController.deletePost)

router.post('/posts/comments/:postId', authenticate, postsController.postComment)

module.exports = router