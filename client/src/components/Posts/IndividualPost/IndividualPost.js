import Comments from '../../Comments/Comments'
import authContext from '../../../context/AuthContext/auth-context'
import {useContext, useEffect, useState} from 'react'
import postContext from '../../../context/PostContext/post-context'
import Modal from '../../UI/Modal/Modal'
import EditPostForm from './EditPostForm/EditPostForm'
import CommentForm from './CommentForm/CommentForm'

const IndividualPost = props => {
    const authCtx = useContext(authContext)
    const postCtx = useContext(postContext)

    const [openEditForm, setOpenEditForm] = useState(false)
    const [openCommentForm, setOpenCommentForm] = useState(false)

    useEffect(() => {
        postCtx.onRetrievePostHandler(props.id)
    }, [])

    const onDeleteClickHandler = () => {
        postCtx.onDeletePostHandler(props.id, authCtx.token)
        props.onDelete()
    }

    const OpenEditFormHandler = () => {
        setOpenEditForm(true)
    }
    const CloseEditFormHandler = () => {
        setOpenEditForm(false)
    }
    const OpenCommentFormHandler = () => {
        setOpenCommentForm(true)
    }
    const CloseCommentFormHandler = () => {
        setOpenCommentForm(false)
    }

    return (
        <div className="scrollbar-thin overflow-y-auto max-h-[48rem] scroll-smooth scroll-m-auto">
            {openEditForm && <Modal><EditPostForm id={props.id} onCloseForm={CloseEditFormHandler}
            title={postCtx.individualPost.title} body={postCtx.individualPost.body}/></Modal>}
            <div className="text-black text-2xl text-center font-bold">
                {postCtx.individualPost.title}
            </div>
            <div className="flex justify-center max-h-96 w-fit">
                {/*Django: 'http://localhost:8080' Flask: 'http://localhost:8080/static/' NodeJS: 'http://localhost:8080'*/}
                <img src={'http://localhost:8080/api' + postCtx.individualPost.imageUrl.replace('public', '')} alt="alt"/>
            </div>
            <div className="scrollbar-thin overflow-y-auto max-h-56 text-justify scroll-smooth scroll-m-auto">
                <p className="m-auto">{postCtx.individualPost.body}</p>
            </div>
            <div className="text-right font-bold">
                <h2>
                    {postCtx.individualPost.author.username}
                </h2>
                {new Date(postCtx.individualPost.createdAt).toLocaleString().split(',')[0]}
            </div>
            {postCtx.individualPost.author.id === authCtx.userId && <div className="flex justify-center">
                <button className={`rounded-full bg-gray-900 hover:bg-blue-700 text-white px-3 py-1 mt-1 mr-1`}
                    onClick={OpenEditFormHandler}>
                    Edit
                </button>
                <button className={`rounded-full bg-gray-900 hover:bg-blue-700 text-white px-3 py-1 mt-1 ml-1`}
                        onClick={onDeleteClickHandler}>
                    Delete
                </button>
            </div>}
            <div>
                {authCtx.userId !== '' && !openCommentForm && <button onClick={OpenCommentFormHandler}
                    className={`rounded-full bg-gray-900 hover:bg-blue-700 text-white px-3 py-1 mt-1 ml-1`}>
                    Add Comment</button>}
                {openCommentForm && <CommentForm onCloseForm={CloseCommentFormHandler}/>}
                {postCtx.individualPost.comments !== undefined && postCtx.individualPost.comments.length > 0 &&
                    <Comments comments={postCtx.individualPost.comments}/>}
            </div>
        </div>
    )
}

export default IndividualPost