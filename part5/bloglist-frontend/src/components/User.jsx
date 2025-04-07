import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UsersContext } from '../UsersContext'
import { Card, ListGroup } from 'react-bootstrap'

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
    <Card>
      <Card.Body>
        <Card.Title as='h2'>{user.name}</Card.Title>
        <Card.Subtitle as='h3'>added blogs</Card.Subtitle>
        <ListGroup>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default User
