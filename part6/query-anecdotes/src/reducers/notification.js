const notificationReducer = (state, action) => {
  const content = action.payload
  switch (action.type) {
    case 'NEW_ANECDOTE':
      if (content && content.length >= 5) {
        return `'${content}' added`
      }
      break
    case 'LIKE':
      return `anecdote '${content}' voted`
    case 'HIDE':
      return null

    default:
      return state
  }
}

export default notificationReducer
