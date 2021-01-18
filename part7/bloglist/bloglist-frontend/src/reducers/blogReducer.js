import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'INIT_BLOGS': {
    return action.content
  }
  case 'NEW_BLOG': {
    return [...state, action.content]
  }
  case 'INCREASE_LIKES': {
    // eslint-disable-next-line no-debugger
    const likedBlog = action.data
    console.log(likedBlog)
    return state.map(blog => likedBlog.id===blog.id ? likedBlog : blog).sort(byLikes)
    // return console.log(state.map(blog => console.log(typeof blog.id)), typeof action.data.id)
  }
  case 'DELETE_BLOG': {
    console.log(action.data)
    return state.filter(blog => blog.id !== action.data)
  }
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      content: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    dispatch ({
      type: 'NEW_BLOG',
      content
    })
  }
}

export const increaseLikes = (content) => {
  return async dispatch => {
    const updateLikes = await blogService.update({ ...content, likes: content.likes + 1, user: content.user.id })
    console.log('updateLikes', updateLikes)
    dispatch({
      type: 'INCREASE_LIKES',
      data: updateLikes
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export default blogReducer