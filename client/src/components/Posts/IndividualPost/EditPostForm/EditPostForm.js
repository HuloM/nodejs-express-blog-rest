import {useState, useCallback, useContext} from 'react'
import useInput from '../../../../hooks/use-input'
import authContext from '../../../../context/AuthContext/auth-context'
import postContext from '../../../../context/PostContext/post-context'

const EditPostForm = props => {
    const authCtx = useContext(authContext)
    const postCtx = useContext(postContext)

    const {
        enteredInput: titleInput,
        enteredInputIsValid: titleIsValid,
        inputIsInvalid: titleIsInvalid,
        inputBlurHandler: titleBlurHandler,
        inputChangeHandler: titleChangeHandler,
        resetOnFormSubmitHandler: resetTitle
    } = useInput(useCallback(input => input.trim() !== '' && input.length > 10, []), props.title)

    const {
        enteredInput: bodyInput,
        enteredInputIsValid: bodyIsValid,
        inputIsInvalid: bodyIsInvalid,
        inputBlurHandler: bodyBlurHandler,
        inputChangeHandler: bodyChangeHandler,
        resetOnFormSubmitHandler: resetBody
    } = useInput(useCallback(input => input.trim() !== '' && input.length > 5, []), props.body)

    const [image, setImage] = useState('')

    const onImageUploadChange = event => {
        setImage(event.target.files[0])
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        const post = {
            titleInput,
            bodyInput,
            image
        }
        postCtx.onUpdatePostHandler(props.id, post, authCtx.token)
        resetBody()
        resetTitle()
        setImage('')
        props.onCloseForm()
    }

    const handleCancelSubmit = event => {
        event.preventDefault()
        resetBody()
        resetTitle()
        setImage('')
        props.onCloseForm()
    }

    const formIsValid = titleIsValid && bodyIsValid

    return (
        <div className='pt-4 flex h-fit'>
            <form onSubmit={handleFormSubmit} className='card bg-gray-500 justify-between grow w-96'>
                <div>
                    <h2 className='font-bold text-center text-white'>Update Post</h2>
                </div>
                {authCtx.authError !== '' && <div className='bg-gray-800 text-center justify-center mt-3 rounded'>
                    <p className='text-rose-600'>{authCtx.authError}</p>
                </div>}
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${titleIsInvalid && 'text-red-700'}`}>Title:</span>
                        <input type="text" className={`form-input rounded block w-full text-black 
                                ${titleIsInvalid && 'border-red-700 border-2'}`}
                                onChange={titleChangeHandler} defaultValue={props.title}
                                onBlur={titleBlurHandler}/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${bodyIsInvalid && 'text-red-700'}`}>Body:</span>
                        <textarea className={`form-textarea mt-1 w-full rounded block text-black 
                                ${bodyIsInvalid && 'border-red-700 border-2'}`}
                                    onChange={bodyChangeHandler} defaultValue={props.body}
                                    onBlur={bodyBlurHandler} rows='5'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span>Image:</span>
                        <br/>
                        <span className='text-sm'>Leave empty if you do not want to change the image</span>
                        <input type="file" className={`w-full`}
                                onChange={onImageUploadChange}/>
                    </label>
                </div>
                <button type='submit' disabled={!formIsValid} className={`rounded-full 
                        ${formIsValid ? 'bg-gray-900 hover:bg-blue-700' : 'bg-gray-600'} text-white px-4 py-2 mt-1`}>Submit</button>
                <button onClick={handleCancelSubmit} className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'>Cancel</button>
            </form>
        </div>
    )
}

export default EditPostForm