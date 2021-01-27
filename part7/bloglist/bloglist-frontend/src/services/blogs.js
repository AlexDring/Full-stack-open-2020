/* eslint-disable no-debugger */
import axios from 'axios'
const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}` }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogObject => {
  // debugger
  // console.log(baseUrl)
  // console.log('blogObject', blogObject)
  // console.log('Token', token)

  // console.log('config', config);

  const response = await axios.post(baseUrl, blogObject, getConfig())
  return response.data
}

const deleteBlog = async blogId => {
  const url = `${baseUrl}/${blogId}`
  console.log(url)
  const response = await axios.delete(url, getConfig())
  return response.data
}
// const update = async blogObject => {
//   // debugger
//   const url = `${baseUrl}/${blogObject.id}`
//   console.log(url)

//   const config = {
//     headers: { Authorization: token }
//   }

//   const response = await axios.put(url, blogObject, config)
//   console.log(response.data)
//   return response.data
// }

const update = (blog) => {
  console.log(`${baseUrl}/${blog.id}`, blog)
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.then(response => response.data)
}

const createComment = async comment => {
  console.log('services', comment)
  const url = `${baseUrl}/${comment.blogId}/comments`

  const request = axios.post(url, comment)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteBlog, createComment }