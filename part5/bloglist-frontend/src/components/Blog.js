import React, { useState } from 'react'

const Blog = (props) => {

  const { blog, updateBlog, removeBlog, userCheck } = props
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

  // const increaseLikes = () => {
  //   updateBlog({
  //     id: blog.id,
  //     title: blog.title,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: blog.likes + 1
  //   })
  // }
  const increaseLikes = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  }
  console.log('testing user', blog.user)

  return(
    <div style={blogStyle} id='single-blog'>
      <div style={hideWhenVisible} className='defaultView'>
        {blog.title} {blog.author}
        <button onClick={visibilityToggle} className='showButton'>show</button>
      </div>
      <div style={showWhenVisible} className='hiddenView'>
        {blog.title} {blog.author}<button onClick={visibilityToggle}>hide</button> <br />
        {blog.url} <br />
          likes: {blog.likes} <button id='like-button' onClick={() => updateBlog(increaseLikes)}>like</button><br />
        {blog.user.name}
        { userCheck === blog.user.username ?  <button onClick={() => removeBlog(blog)}>delete</button> : null }
      </div>
    </div>

  )
}

export default Blog
