import React from 'react'

const PostContext = React.createContext({
    page: 0,
    totalPages: 0,
    posts: [],
    individualPost: {},
    postError: '',
    onCreatePostHandler: (postData, token) => {},
    onCreateCommentHandler: (postId, commentData, token) => {},
    onRetrievePostHandler: (postId) => {},
    onRetrievePostsHandler: (page) => {},
    onUpdatePostHandler: (postId, postData, token) => {},
    onDeletePostHandler: (postId, token) => {},
})

export default PostContext