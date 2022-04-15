const express = require('express')

const postsController = require('../controllers/post-controller')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/posts', postsController.getPosts)

router.get('/posts/:postId', postsController.getPost)

router.post('/posts',authenticate, postsController.postPost)

router.put('/posts',authenticate, postsController.updatePost)

router.delete('/posts',authenticate, postsController.deletePost)

router.post('/posts/comments', authenticate)

module.exports = router