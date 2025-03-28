import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    )
  })

  const dispatch = useDispatch()

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(likeAnecdote(anecdote))}
          />
        ))}
    </div>
  )
}

export default AnecdoteList
