const Notification = ({ message, isError }) => {
  if (message === null && !isError) {
    return null;
  } else if (isError) {
    return <div className='message error'>{message}</div>;
  }
  return <div className='message notification'>{message}</div>;
};

export default Notification;
