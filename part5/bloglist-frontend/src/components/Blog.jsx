import { useState } from 'react'

const Blog = ({ blog, user, removeBlog, updateLikes }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes}{' '}
        <button onClick={() => updateLikes(blog.id, blog)}>
          like
        </button>{' '}
        <br />
        {blog.user
          ? blog.user.name
          : 'User for this blog doesn`t exist'}
        <br />
        {blog.user && blog.user.username === user.username && (
          <button
            style={{ backgroundColor: 'red'}}
            onClick={() => removeBlog(blog)}
          >
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
