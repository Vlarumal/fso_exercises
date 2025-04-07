import { Link } from 'react-router-dom'
import { UsersContext } from '../UsersContext'
import { useContext } from 'react'
import { Card, Table } from 'react-bootstrap'

const Users = () => {
  const users = useContext(UsersContext)
  return (
    <Card>
      <Card.Body>
        <Card.Title as='h2'>Users</Card.Title>
        <Table striped bordered hover responsive>
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
        </Table>
      </Card.Body>
    </Card>
  )
}

Users.displayName = 'Users'

export default Users
