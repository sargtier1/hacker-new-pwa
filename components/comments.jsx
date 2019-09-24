import Comment from './comment'

export default ({ comments }) => (
  <>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </>
)
