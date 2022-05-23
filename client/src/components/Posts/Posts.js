import Post from './Post/Post'
import {useContext, useEffect} from 'react'
import postContext from '../../context/PostContext/post-context'

const Posts = () => {
    const postCtx = useContext(postContext)

    useEffect(() => {
        postCtx.onRetrievePostsHandler(1)
    }, [])

    const onNextClickHandler = () => {
        postCtx.onRetrievePostsHandler(postCtx.page + 1)
    }

    const onPreviousClickHandler = () => {
        postCtx.onRetrievePostsHandler(postCtx.page - 1)
    }

    return (
        <div className='flex-container h-fit'>
            {postCtx.posts.map(post => (
                <Post post={post} key={post.id}/>
            ))}
            <div className="flex justify-center">
                {postCtx.page > 1 && (
                    <button className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1 mx-1'
                            onClick={onPreviousClickHandler}>
                        Previous
                    </button>
                )}
                {postCtx.page < postCtx.totalPages && (
                    <button className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'
                            onClick={onNextClickHandler}>
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default Posts