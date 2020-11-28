import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const { blog, updateBlog, removeBlog } = props

  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    border: 'solid',
    marginBottom: 5
  }

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const visibilityToggle = () => {
    setVisibility(!visibility)
  }

  const increaseLikes = () => {
    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  const deleteThisBlog = () => {
    removeBlog(blog)
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))


  return(
    <div style={blogStyle}>
      {/* {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <div>
          {blog.title} {blog.author}
          {blog.url} <br />
          likes: {blog.likes} <button>like</button>
        </div>
      </Togglable>
      <div> */} 
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={visibilityToggle}>show</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}<button onClick={visibilityToggle}>hide</button> <br />
          {blog.url} <br />
          likes: {blog.likes} <button onClick={increaseLikes}>like</button>
          {/* { blog.user !== undefined ? blog.user.name } */}
          { loggedInUser.username === blog.user.username ?  <button onClick={deleteThisBlog}>delete</button> : null }

        </div>
    </div>
    
  )
}

export default Blog
