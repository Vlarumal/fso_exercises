import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const { data } = await axios.post(baseUrl, object)
  return data
}

const update = async (id, newObject) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, newObject)
  return data
}

export default {
  getAll,
  createNew,
  update,
}
