import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null })

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
    blogFormRef.current.setVisibility

    const returnedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(returnedBlog))
    notify(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
    )
  }

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const notify = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
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
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </>
  )

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
