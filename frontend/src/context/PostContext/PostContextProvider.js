import React, {useState} from 'react'

import PostContext from './post-context'

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

    const ENDPOINT_URL = 'http://localhost:8080'


    // sends a POST request to the posts endpoint
    // that will use the form data to create a new post
    const onCreatePostHandler = async (postData, token) => {
        const formData = new FormData()
        formData.append('title', postData.titleInput)
        formData.append('body', postData.bodyInput)
        formData.append('image', postData.image)

        const response = await fetch(ENDPOINT_URL + '/posts/', {
            method: 'POST',
            headers: {
                Authorization: token
            },
            body: formData
        })
        const data = await response.json()
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        return data.message
    }

    // sends a GET request to the post endpoint
    // that will retrieve a single post
    const onRetrievePostHandler = async postId => {
        const response = await fetch(ENDPOINT_URL +  `/post/${postId}`, { method: 'GET' })

        const data = await response.json()
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        setIndividualPost(data.post)
    }

    // sends a GET request to the posts endpoint
    // that will  retrieve a paginated list of posts
    const onRetrievePostsHandler = async (page) => {
        setPage(page)
        const method = 'GET'
        const posts = await fetch(ENDPOINT_URL +  '/posts/' + page, {
            method: method
        })
        const data = await posts.json()
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
        const response = await fetch(ENDPOINT_URL +  `/post/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: token
            },
            body: formData
        })
        const data = await response.json()
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
        const response = await fetch(`http://localhost:8080/post/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        const data = await response.json()
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

        const response = await fetch(
            ENDPOINT_URL +  `/post/comments/${postId}`, {
                method: 'POST',
                headers: {
                    Authorization: token
                },
                body: formData
            })
        const data = await response.json()
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
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