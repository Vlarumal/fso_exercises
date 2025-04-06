import axios from 'axios'
import { useNotificationDispatch } from '../NotificationContext'
import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  const dispatch = useNotificationDispatch()

  useEffect(() => {
    const usersUrl = 'http://localhost:3003/api/users'
    const getUsers = async () => {
      try {
        const response = await axios.get(usersUrl)
        setUsers(response.data)
      } catch (error) {
        dispatch({
          type: 'ERROR_GETTING_USERS',
          message: error,
          isError: true,
        })
      }
    }

    getUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
