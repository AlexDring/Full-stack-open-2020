import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const anecdoteObject = { content: anecdote, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const update = async (updateAnecdote) => {
  const response = await axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote)
  console.log(response);
}

export default { getAll, create, update }