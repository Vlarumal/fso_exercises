import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UsersContext } from '../UsersContext'

const User = () => {
  const users = useContext(UsersContext)
  const { id } = useParams()

  const [user, setUser] = useState(null)

  useEffect(() => {
    if (users) {
      const foundUser = users.find((user) => user.id === id)
      if (foundUser) {
        setUser(foundUser)
      }
    }
  }, [users, id])

  if (!user) return <div>No info...</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
