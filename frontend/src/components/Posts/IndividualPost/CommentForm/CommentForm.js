import {useContext, useCallback} from 'react'
import authContext from '../../../../context/AuthContext/auth-context'
import postContext from '../../../../context/PostContext/post-context'
import useInput from '../../../../hooks/use-input'

const CommentForm = props => {
    const authCtx = useContext(authContext)
    const postCtx = useContext(postContext)

    const {
        enteredInput: commentInput,
        enteredInputIsValid: commentIsValid,
        inputIsInvalid: commentIsInvalid,
        inputBlurHandler: commentBlurHandler,
        inputChangeHandler: commentChangeHandler,
        resetOnFormSubmitHandler: resetComment
    } = useInput(useCallback(input => input.trim() !== '' && input.length > 5, []))

    const handleFormSubmit = async event => {
        event.preventDefault()
        const postId = postCtx.individualPost.id
        postCtx.onCreateCommentHandler(postId, commentInput, authCtx.token)
        resetComment()
        props.onCloseForm()
    }

    const handleCancelSubmit = event => {
        event.preventDefault()
        resetComment()
        props.onCloseForm()
    }

    return (
        <div className="pt-4 flex h-fit">
            <form onSubmit={handleFormSubmit} className="card bg-gray-500 justify-between grow w-96">
                <div>
                    <h2 className="font-bold text-center text-white">Create a Comment</h2>
                </div>
                {authCtx.authError !== '' && <div className="bg-gray-800 text-center justify-center mt-3 rounded">
                    <p className="text-rose-600">{authCtx.authError}</p>
                </div>}
                <div className="py-2">
                    <label className="font-bold">
                        <span className={`${commentIsInvalid && 'text-red-700'}`}>Comment:</span>
                        <input type="text" className={`form-input rounded block w-full text-black 
                                ${commentIsInvalid && 'border-red-700 border-2'}`}
                                onChange={commentChangeHandler} value={commentInput} onBlur={commentBlurHandler}/>
                    </label>
                </div>
                <button type="submit" disabled={!commentIsValid} className={`rounded-full 
                        ${commentIsValid ? 'bg-gray-900 hover:bg-blue-700' : 'bg-gray-600'} text-white px-4 py-2 mt-1`}>
                    Submit
                </button>
                <button onClick={handleCancelSubmit}
                        className="rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1">Cancel
                </button>
            </form>
        </div>
    )
}

export default CommentForm