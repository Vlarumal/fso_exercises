import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { notify, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout = 5) => {
  return (dispatch) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}
export default notificationSlice.reducer
