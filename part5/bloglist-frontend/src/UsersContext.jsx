import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNotificationDispatch } from './NotificationContext'

export const UsersContext = createContext()

export const UsersContextProvider = ({ children }) => {
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
          type: 'ERROR',
          message: error,
          isError: true,
        })
      }
    }

    getUsers()
  }, [])

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  )
}
