import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { increaseLikes, deleteBlog, newComment } from '../reducers/blogReducer'

const Blog = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const updateBlog = (id) => {
    const likeID = blogs.find(blog => blog.id === id)
    dispatch(increaseLikes(likeID))
  }

  const addComment = (e) => {
    e.preventDefault()
    const comment = {
      comment: e.target.comment.value,
      blogId: blog.id
    }
    e.target.comment.value = ''
    // console.log('component', comment)
    dispatch(newComment(comment))
  }

  const removeBlog = (id) => {
    dispatch(deleteBlog(id))
  }


  if (!blog) {
    return null
  }
  // // blog.comments.map(comment => console.log(comment))
  // console.log('BLOG', blog)
  // console.log('BLOG.USER', blog.user)
  // console.log('BLOG.USER.NAME', blog.user.name)
  return(
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button id='like-button' onClick={() => updateBlog(blog.id)}>like</button></div>
      <div>added by {blog.user.name}  {blog.user.username===user.username && <button onClick={() => removeBlog(blog.id)}>delete</button>}</div>
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input type="text" name="comment"/><button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment._id}>{comment.comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog