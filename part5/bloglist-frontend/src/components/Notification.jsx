import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  const { message, isError } = notification

  if (!message) return null

  return (
    <Alert
      className='sticky-top'
      variant={isError ? 'danger' : 'success'}
    >
      {message}
    </Alert>
  )
}

export default Notification
