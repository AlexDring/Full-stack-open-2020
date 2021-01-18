/* eslint-disable no-debugger */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogObject => {
  // console.log(baseUrl)
  // console.log('blogObject', blogObject)
  // console.log('Token', token)
  const config = {
    headers: { Authorization: token }
  }
  // console.log('config', config);
  console.log(baseUrl, blogObject, config)
  const response = await axios.post(baseUrl, blogObject, config)

  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blogId}`
  console.log(url)
  const response = await axios.delete(url, config)
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
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.then(response => response.data)
}


export default { getAll, create, setToken, update, deleteBlog }