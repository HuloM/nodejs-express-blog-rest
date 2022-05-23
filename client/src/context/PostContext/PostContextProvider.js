import React, {useState} from 'react'

import PostContext from './post-context'

const axios = require('axios')

const PostProvider = props => {
    // state variables that hold post related data

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [posts, setPosts] = useState([])
    const [individualPost, setIndividualPost] = useState({
        title: '',
        imageUrl: '',
        body: '',
        author: {
            username: '',
            id: ''
        },
        createdAt: '',
        comments: []
    })
    const [postError, setPostError] = useState('')

    const ENDPOINT_URL = 'http://localhost:8080/api'


    // sends a POST request to the posts endpoint
    // that will use the form data to create a new post
    const onCreatePostHandler = async (postData, token) => {
        const formData = new FormData()
        formData.append('title', postData.titleInput)
        formData.append('body', postData.bodyInput)
        formData.append('image', postData.image)

        const response = await axios.post(`${ENDPOINT_URL}/posts/`, formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        })
        const data = response.data
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        await onRetrievePostsHandler(page)
    }

    // sends a GET request to the post endpoint
    // that will retrieve a single post
    const onRetrievePostHandler = async postId => {
        const response = await axios.get(`${ENDPOINT_URL}/post/${postId}`)

        const data = response.data

        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        setIndividualPost(data.post)
    }

    // sends a GET request to the posts endpoint
    // that will  retrieve a paginated list of posts
    const onRetrievePostsHandler = async (pageNum) => {
        setPage(pageNum)

        const response = await axios.get(`${ENDPOINT_URL}/posts/${pageNum}`)

        const data = response.data

        console.log(data)
        setPosts(data.posts)
        setTotalPages(data.totalPages)
    }

    // sends a PUT request to the post endpoint
    // that will update a post
    const onUpdatePostHandler = async (postId, postData, token) => {
        const formData = new FormData()
        formData.append('title', postData.titleInput)
        formData.append('body', postData.bodyInput)
        formData.append('image', postData.image)
        const response = await axios.put(`${ENDPOINT_URL}/post/${postId}`, formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        })
        const data = await response.data
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        setIndividualPost(data.post)
    }

    // sends a DELETE request to the post endpoint
    // that will delete a post
    const onDeletePostHandler = async (postId, token) => {
        const response = await axios.delete(`${ENDPOINT_URL}/post/${postId}`,{
            headers: {
                Authorization: token,
            }
        })
        const data = await response.data
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        await onRetrievePostsHandler(page)
    }
    // sends a PUT request to the post/comments endpoint
    // that will create a comment on the post passed in
    const onCreateCommentHandler = async (postId, commentData, token) => {
        const formData = new FormData()
        formData.append('comment', commentData)

        const response = await axios.post(`${ENDPOINT_URL}/post/comments/${postId}`, formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data'
                }
            })
        const data = await response.data
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
        }
        await onRetrievePostHandler(postId)
    }

    // pass post context values to PostContext provider
    const postContext = {
        page,
        totalPages,
        posts,
        individualPost,
        postError,
        onCreatePostHandler,
        onCreateCommentHandler,
        onRetrievePostHandler,
        onRetrievePostsHandler,
        onUpdatePostHandler,
        onDeletePostHandler,
    }

    return (
        <PostContext.Provider value={postContext}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostProvider