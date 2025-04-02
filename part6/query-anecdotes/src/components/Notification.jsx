import { useEffect } from 'react'
import {
  useNotificationDispatch,
  useNotificationValue,
} from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification ? 'block' : 'none',
  }

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    }
  }, [notification])

  return <div style={style}>{notification}</div>
}

export default Notification
