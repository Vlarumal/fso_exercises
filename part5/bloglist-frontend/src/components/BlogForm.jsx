import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    clearBlogForm()
  }

  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor='title'>Title: </label>
        <input
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <label htmlFor='author'>Author: </label>
        <input
          id='author'
          value={author}
          onChange={handleAuthorChange}
        />
        <br />
        <label htmlFor='url'>Url: </label>
        <input
          id='url'
          value={url}
          onChange={handleUrlChange}
        />
        <br />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
