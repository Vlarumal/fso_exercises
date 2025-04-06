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
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useLoggedDispatch, useLoggedValue } from './LoggedContext'
import Users from './components/Users'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useNotificationValue()

  const loggedUser = useLoggedValue()
  const loggedDispatch = useLoggedDispatch()

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBloglistappUser'
    )
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      loggedDispatch({ type: 'SET_USER', user })
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
      loggedDispatch({ type: 'SET_USER', user })
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
      loggedDispatch({ type: 'LOGOUT' })
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
      newBlogMutation.mutate(blogObj)
      notify(`a new blog ${blogObj.title} by ${blogObj.author} added`)
    } catch (error) {
      notify(`${error}`, true)
    }
  }

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const notificationDispatch = useNotificationDispatch()
  const notify = (message, isError = false) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      message,
      isError,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const handleLikes = async (id, blogToUpdate) => {
    const user = blogToUpdate.user
      ? blogToUpdate.user.id
        ? blogToUpdate.user.id
        : blogToUpdate.user
      : null

    try {
      updateBlogMutation.mutate({
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user: user,
      })
      notify(`Blog ${blogToUpdate.title} liked`)
    } catch (error) {
      notify(`Error while trying to update likes: ${error}`, error)
    }
  }

  const handleDelete = (blog) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      if (blog.user.username === loggedUser.username) {
        notify(`Blog ${blog.title} has been deleted`)
        deleteBlogMutation.mutate(blog.id)
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

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

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
              user={loggedUser}
              removeBlog={handleDelete}
              updateLikes={handleLikes}
            />
          ))}
      </div>
    </>
  )

  return (
    <div>
      {loggedUser === null ? (
        loginForm()
      ) : (
        <div>
          <header>
            {loggedUser.name} logged-in{' '}
            <button
              type='button'
              onClick={handleLogout}
            >
              logout
            </button>
          </header>
          <div>
            <Link to='/'>home </Link>
            <Link to='/blogs'>blogs </Link>
            <Link to='/users'>users</Link>
          </div>

          <Routes>
            <Route
              path='/users'
              element={<Users />}
            />
            <Route
              path='/blogs'
              element={
                <div>
                  <h2>blogs</h2>
                  <Notification notification={notification} />

                  {blogForm()}
                </div>
              }
            />
            <Route
              path='/'
              element={<h2>Blog app</h2>}
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
