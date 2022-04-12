const express = require('express')

const postsController = require('../controllers/post-controller')

const router = express.Router()

router.get('/posts', postsController.getPosts)

router.get('/posts/:postId', postsController.getPost)

router.post('/posts', postsController.postPost)

router.put('/posts', postsController.updatePost)

router.delete('/posts', postsController.deletePost)


router.post('/posts/comments')

module.exports = router