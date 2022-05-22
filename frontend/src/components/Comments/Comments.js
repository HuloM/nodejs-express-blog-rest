import Comment from './Comment/Comment'


const Comments = props => {
    const comments = props.comments

    return (
        <div>
            <h2 className='text-left pt-10'>Comments</h2>
            <ul className='list-none'>
                {comments.map(comment => (
                    <li><Comment comment={comment} key={comment.id}/></li>
                ))}
            </ul>
        </div>
    )
}

export default Comments