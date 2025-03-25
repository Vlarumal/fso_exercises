const Notification = ({ notification }) => {
  const { message, isError } = notification

  if (!message) return null

  const msgStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div
      className='notification'
      style={msgStyle}
    >
      {message}
    </div>
  )
}

export default Notification
