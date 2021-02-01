import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS': {
    return action.payload
  }
  case 'NEW_BLOG': {
    return [...state, action.payload]
  }
  case 'INCREASE_LIKES': {
    const likedBlog = action.payload
    return state.map(blog => likedBlog.id===blog.id ? likedBlog : blog)
  }
  case 'DELETE_BLOG': {
    return state.filter(blog => blog.id !== action.data)
  }
  case 'NEW_COMMENT': {
    return state.map(blog => {
      if (blog.id !== action.payload.blogId) {
        return blog
      }
      return {
        ...blog,
        comments: [...blog.comments, action.payload.comment]
      }
    })}
  default:
    return state
  }
}

export const newComment = (comment) => {
  return async dispatch => {
    const createdComment = await blogService.createComment(comment)
    const newComment = {
      comment: createdComment,
      blogId: comment.blogId
    }
    dispatch({
      type: 'NEW_COMMENT',
      payload: newComment
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    try {
      const addedBlog = await blogService.create(newBlog)
      dispatch ({
        type: 'NEW_BLOG',
        payload: addedBlog
      })
    } catch(error) {
      dispatch(setNotification({ message: `blog not added - ${error.response.data.error}`, class: 'error' }))
    }
  }
}

export const increaseLikes = (blog) => {
  return async dispatch => {
    const updateLikes = await blogService.update({ ...blog, likes: blog.likes + 1, user: blog.user.id })
    dispatch({
      type: 'INCREASE_LIKES',
      payload: updateLikes
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    } catch(error) {
      console.log(error)
    }
  }
}

export default blogReducer