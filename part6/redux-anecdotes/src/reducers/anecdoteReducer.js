import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
    },
    likeAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(
        (anecdote) => anecdote.id === id
      )
      const likedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : likedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const {
  createAnecdote,
  likeAnecdote,
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
