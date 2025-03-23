import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, name }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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

  const handleLikes = async (id, blogToUpdate) => {
    try {
      setLikes(likes + 1)
      
      await blogService.update(id, {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      })
    } catch (error) {
      console.error('Failed to update likes:', error)
      setLikes(likes - 1)
    }
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
        {blog.url} <br />
        likes {likes}{' '}
        <button onClick={() => handleLikes(blog.id, blog)}>
          like
        </button>{' '}
        <br />
        {name}
      </div>
    </div>
  )
}

export default Blog
