import { createContext, useContext, useReducer } from 'react'

const loggedReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const LoggedContext = createContext()

export const LoggedContextProvider = (props) => {
  const [logged, loggedDispatch] = useReducer(loggedReducer, null)

  return (
    <LoggedContext.Provider value={[logged, loggedDispatch]}>
      {props.children}
    </LoggedContext.Provider>
  )
}

export const useLoggedValue = () => {
  const loggedAndDispatch = useContext(LoggedContext)
  return loggedAndDispatch[0]
}

export const useLoggedDispatch = () => {
  const loggedAndDispatch = useContext(LoggedContext)
  return loggedAndDispatch[1]
}

export default LoggedContext
