import {useContext, useState} from 'react'
import Modal from '../../UI/Modal/Modal'
import IndividualPost from '../IndividualPost/IndividualPost'
import authContext from '../../../context/AuthContext/auth-context'
import postContext from '../../../context/PostContext/post-context'


const Post = props => {
    const [showPost, setShowPost] = useState(false)
    const postCtx = useContext(postContext)
    const post = props.post

    const handleShowPost = () => {
        setShowPost(true)
    }

    const handleClosePost = () => {
        setShowPost(false)
    }

    const onPostDeleteHandler = async () => {
        setShowPost(false)
        postCtx.onRetrievePostsHandler()
    }

    return (
        <>
            {showPost && <Modal onClick={handleClosePost}><IndividualPost id={post.id} onDelete={onPostDeleteHandler}/></Modal>}
            <a onClick={handleShowPost} href={'#'}>
                <div className='card bg-gray-500 flex justify-between grow my-2 gap-x-40' onClick={handleShowPost}>
                    <span className='text-left'>{post.title}</span>
                    <div className='top-0 right-0 text-right'>
                        <span>{post.author.username}</span>
                        <div>{new Date(post.createdAt).toLocaleString().split(',')[0]}</div>
                    </div>
                </div>
            </a>
        </>
    )
}

export default Post