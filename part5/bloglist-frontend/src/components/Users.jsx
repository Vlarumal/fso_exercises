import { Link } from 'react-router-dom'
import { UsersContext } from '../UsersContext'
import { useContext } from 'react'

const Users = () => {
  const users = useContext(UsersContext)
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
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Users.displayName = 'Users'

export default Users
