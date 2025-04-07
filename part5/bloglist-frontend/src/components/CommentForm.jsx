import { useState } from 'react'
import { addComment } from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CommentForm = ({ id }) => {
  const [text, setText] = useState('')

  const queryClient = useQueryClient()
  const newCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const createComment = async (event) => {
    event.preventDefault()
    newCommentMutation.mutate([id, { text }])
    setText('')
  }

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  return (
    <form onSubmit={createComment}>
      <label htmlFor='textComment'>Comment: </label>
      <input
        type='text'
        id='textComment'
        value={text}
        onChange={handleTextChange}
      />
      <button type='submit'>add</button>
    </form>
  )
}

export default CommentForm
