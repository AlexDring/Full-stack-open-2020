import blogService from '../services/blogs'

// const byLikes = (a1, a2) => a2.likes - a1.likes

const blogReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
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
    console.log(action.data)
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
  // return state.map(blog => {
  //   // eslint-disable-next-line no-debugger
  //   debugger
  //   blog.id !== action.payload.blogId
  //     ? blog
  //     : { ...blog, comments: [...blog.comments, action.payload.comment] }
  // })}
  default:
    return state
  }
}

export const newComment = (comment) => {
  return async dispatch => {
    const createdComment = await blogService.createComment(comment)
    console.log('post service', createdComment)
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
    const addedBlog = await blogService.create(newBlog)
    dispatch ({
      type: 'NEW_BLOG',
      payload: addedBlog
    })
  }
}

export const increaseLikes = (blog) => {
  return async dispatch => {
    // const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updateLikes = await blogService.update({ ...blog, likes: blog.likes + 1, user: blog.user.id })
    console.log('updateLikes', updateLikes)
    dispatch({
      type: 'INCREASE_LIKES',
      payload: updateLikes
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