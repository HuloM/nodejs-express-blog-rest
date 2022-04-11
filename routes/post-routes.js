const express = require('express')

const postsController = require('../controllers/post-controller')

const router = express.Router()

router.get('/posts', postsController.getPosts)

router.get('/posts/:postId')

router.post('/posts', postsController.postPost)

router.put('/posts')

router.delete('/posts')


router.post('/posts/comments')

module.exports = router