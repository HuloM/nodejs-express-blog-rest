const express = require('express')

const router = express.Router()

router.get('/posts')

router.get('/posts/:postId')

router.post('/posts')

router.put('/posts')

router.delete('/posts')

router.post('/posts/comments')

module.exports = router