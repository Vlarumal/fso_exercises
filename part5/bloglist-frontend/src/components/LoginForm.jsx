import PropTypes from 'prop-types'
import { Button, Card, Form } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              data-testid='username'
              type='text'
              value={username}
              name='Username'
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              data-testid='password'
              type='password'
              value={password}
              name='Password'
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Button type='submit'>login</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
