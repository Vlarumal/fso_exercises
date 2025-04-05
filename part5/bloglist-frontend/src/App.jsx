import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import {
  useNotificationDispatch,
  useNotificationValue,
} from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [likes, setLikes] = useState(0)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBloglistappUser'
    )
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBloglistappUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      clearLoginForm()
    } catch (exception) {
      console.error('Wrong username or password', exception)
      notify('Wrong username or password', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBloglistappUser')
      setUser(null)
      clearLoginForm()
    } catch (exception) {
      console.error('Something went wrong', exception)
      notify('Something went wrong', true)
    }
  }

  const addBlog = async (blogObj) => {
    if (!blogObj.title || !blogObj.author || !blogObj.url) {
      return notify('Check for empty fields', true)
    }

    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(returnedBlog))
      notify(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
    } catch (error) {
      notify(`${error}`, true)
    }
  }

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const dispatch = useNotificationDispatch()
  const notify = (message, isError = false) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      isError,
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const handleLikes = async (id, blogToUpdate) => {
    const user = blogToUpdate.user
      ? blogToUpdate.user.id
        ? blogToUpdate.user.id
        : blogToUpdate.user
      : null

    try {
      const updatedBlog = await blogService.update(id, {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user: user,
      })
      setLikes(updatedBlog.likes)
      notify(`${updatedBlog.title} liked`)
    } catch (error) {
      notify(`Error while trying to update likes: ${error}`, error)
    }
  }

  const handleDelete = (blog) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      if (blog.user.username === user.username) {
        blogService.remove(blog.id)
        const blogsAfterDelete = blogs.filter((b) => b.id !== blog.id)
        setBlogs(blogsAfterDelete)
      } else {
        notify("You can't delete other users' blogs", true)
      }
    }
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <Togglable
        buttonLabel='login'
        ref={loginFormRef}
      >
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) =>
            setUsername(target.value)
          }
          handlePasswordChange={({ target }) =>
            setPassword(target.value)
          }
          handleSubmit={handleLogin}
        />
      </Togglable>
    </>
  )

  const blogForm = () => (
    <>
      <Togglable
        buttonLabel='create new blog'
        ref={blogFormRef}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              removeBlog={handleDelete}
              updateLikes={handleLikes}
            />
          ))}
      </div>
    </>
  )

  const notification = useNotificationValue()

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged-in{' '}
            <button
              type='button'
              onClick={handleLogout}
            >
              logout
            </button>
          </p>
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App
