import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  // console.log(props)
  console.log(props)
  const { blog, user } = props
  const dispatch = useDispatch()
  // const { blog, updateBlog, removeBlog, owner } = props
  const [visibility, setVisibility] = useState(false)
  console.log(user)

  const owner = (blog.user.username === user)

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
  const blogs = useSelector(state => state.blogs)

  const updateBlog = (id) => {
    const likeID = blogs.find(blog => blog.id === id)
    console.log(likeID)
    dispatch(increaseLikes(likeID))
  }
  const removeBlog = (id) => {
    // console.log(id)
    // const deleteID = blogs.find(blog => blog.id === id)
    // console.log(deleteID)
    dispatch(deleteBlog(id))
  }

  return(
    <div style={blogStyle} id='single-blog'>
      <div style={hideWhenVisible} className='defaultView'>
        {blog.title} {blog.author}
        <button onClick={visibilityToggle} className='showButton'>show</button>
      </div>
      <div style={showWhenVisible} className='hiddenView'>
        title: {blog.title} author: {blog.author}<button onClick={visibilityToggle}>hide</button> <br />
        url: {blog.url} <br />
        likes: {blog.likes} <button id='like-button' onClick={() => updateBlog(blog.id)}>like</button><br /> {/* // TODO LOOK AT THIS TOMORROW - how does it get the clicked id how is it passed in?? */}
        {blog.user.name}
        {/* {owner && <button onClick={() => removeBlog(blog)}>delete</button>} */}
        {owner && <button onClick={() => removeBlog(blog.id)}>delete</button>}
      </div>
    </div>

  )
}

export default Blog
