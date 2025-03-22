import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Wrong credentials', exception)
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBloglistappUser')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Something went wrong', exception)
      // setErrorMessage('Something went wrong')
      // setTimeout(() => {
      // setErrorMessage(null)
      // }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  const blogForm = () =>
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
      />
    ))

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
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
