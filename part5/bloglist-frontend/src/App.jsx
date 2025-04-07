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
import User from './components/User'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useNotificationValue()

  const loggedUser = useLoggedValue()
  const loggedDispatch = useLoggedDispatch()

  const queryClient = useQueryClient()

  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => handleMutationSuccess(),
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => handleMutationSuccess(),
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => handleMutationSuccess(),
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

  const navigate = useNavigate()
  const handleDelete = (blog) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      if (blog.user.username === loggedUser.username) {
        notify(`Blog ${blog.title} has been deleted`)
        deleteBlogMutation.mutate(blog.id)
        navigate('/blogs')
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
            <div
              style={{
                paddingTop: 10,
                paddingLeft: 2,
                marginBottom: 5,
                borderStyle: 'solid',
                borderWidth: 1,
              }}
              className='blogMainInfo'
              key={blog.id}
            >
              <Link to={`${blog.id}`}>
                {blog.title} {blog.author}{' '}
              </Link>
            </div>
          ))}
      </div>
    </>
  )

  return (
    <div className='container'>
      {loggedUser === null ? (
        loginForm()
      ) : (
        <div>
          <Navbar
            collapseOnSelect
            bg='light'
            expand='lg'
          >
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link
                  href='#'
                  as='span'
                >
                  <Link to='/'>home </Link>
                </Nav.Link>
                <Nav.Link
                  href='#'
                  as='span'
                >
                  <Link to='/blogs'>blogs </Link>
                </Nav.Link>
                <Nav.Link
                  href='#'
                  as='span'
                >
                  <Link to='/users'>users</Link>
                </Nav.Link>
              </Nav>
              <Navbar.Text>
                {' '}
                {loggedUser.name} logged-in{' '}
                <Button
                  size='sm'
                  onClick={handleLogout}
                  className='ms-2'
                >
                  logout
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <Notification notification={notification} />
          <Routes>
            <Route
              path='/users/:id'
              element={<User />}
            />
            <Route
              path='/users'
              element={<Users />}
            />
            <Route
              path='/blogs/:id'
              element={
                <Blog
                  blogs={blogs}
                  removeBlog={handleDelete}
                  updateLikes={handleLikes}
                />
              }
            />
            <Route
              path='/blogs'
              element={
                <div>
                  <h2>blogs</h2>
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
