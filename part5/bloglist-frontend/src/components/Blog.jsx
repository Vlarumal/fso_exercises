import { useNavigate, useParams } from 'react-router-dom'

const Blog = ({ blogs, removeBlog, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  }

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
    <div
      style={blogStyle}
      className='blog'
    >
      <div className='togglableContent'>
        <h2>
          {blog.title} {blog.author}{' '}
        </h2>
        <div>
          <button onClick={() => navigate('/blogs')}>Back</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button
            style={{ marginLeft: 5 }}
            onClick={addLike}
            className='likeButton'
          >
            like
          </button>{' '}
        </div>
        {blog.user
          ? blog.user.name
          : 'User for this blog doesn`t exist'}
        <br />
        {blog.user && blog.user.username === user.username && (
          <button
            style={{ backgroundColor: 'red' }}
            onClick={() => removeBlog(blog)}
          >
            remove
          </button>
        )}
      </div>
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
