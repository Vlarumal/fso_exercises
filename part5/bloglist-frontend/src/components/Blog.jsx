import { useNavigate, useParams } from 'react-router-dom'
import Togglable from './Togglable'
import CommentForm from './CommentForm'
import { Badge, Button, Card, ListGroup } from 'react-bootstrap'

const Blog = ({ blogs, removeBlog, updateLikes }) => {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === id)
  const user = JSON.parse(
    window.localStorage.getItem('loggedBloglistappUser')
  )

  const addLike = (event) => {
    event.preventDefault()
    updateLikes(blog.id, blog)
  }

  const navigate = useNavigate()
  return (
    <Card>
      <div className='togglableContent'>
        <h2>
          {blog.title} {blog.author}{' '}
        </h2>
        <div>
          <Button
            variant='secondary'
            onClick={() => navigate('/blogs')}
          >
            Back to Blogs
          </Button>
        </div>
        <Card.Text>URL: {blog.url}</Card.Text>
        <div>
          <Badge className='me-2'>likes {blog.likes}</Badge>
          <Button
            onClick={addLike}
            className='likeButton'
            variant='success'
          >
            👍 Like
          </Button>{' '}
        </div>
        {blog.user
          ? blog.user.name
          : 'User for this blog doesn`t exist'}
        <br />
        {blog.user && blog.user.username === user.username && (
          <Button
            variant='danger'
            onClick={() => removeBlog(blog)}
          >
            🗑️ remove
          </Button>
        )}
      </div>
      <div>
        <h3>comments</h3>
        <Togglable buttonLabel='💬 add comment'>
          <CommentForm id={id} />
        </Togglable>
        <ListGroup>
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment._id}>💬 {comment.text}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Card>
  )
}

export default Blog
