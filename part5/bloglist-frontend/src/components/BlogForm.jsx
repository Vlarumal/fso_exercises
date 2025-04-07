import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

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
    <Card>
      <Card.Body className='sm'>
        <Card.Title as='h3'>create new</Card.Title>
        <Form onSubmit={addBlog}>
          <Form.Label htmlFor='title'>Title: </Form.Label>
          <Form.Control
            data-testid='title'
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
          <br />
          <Form.Label htmlFor='author'>Author: </Form.Label>
          <Form.Control
            data-testid='author'
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
          <br />
          <Form.Label htmlFor='url'>Url: </Form.Label>
          <Form.Control
            data-testid='url'
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
          <br />
          <Button type='submit'>create</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default BlogForm
