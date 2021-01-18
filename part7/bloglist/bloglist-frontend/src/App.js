import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  const blogFormRef = React.createRef() // TODO https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      // setUserCheck(user.username)
      blogService.setToken(user.token)
    }
    console.log(loggedInUser)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })// this gets routed through services/login.js to the backend where the credentials are checked. If ok the username, name and token are stored in the user state.
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch(error) {
      // notify(error.response.data.error, 'error')
      dispatch(setNotification({ message: error.response.data.error, class: 'error' }))
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  // const addBlog = async (blogObject) => {
  //   try {
  //     const addedBlog = await blogService.create(blogObject)
  //     blogFormRef.current.visibilityToggle()
  //     setBlogs(blogs.concat(addedBlog))
  //     dispatch(setNotification({ message: `${addedBlog.title} by ${addedBlog.author} has been added`, class: 'success' }))
  //   } catch(error) {
  //     dispatch(setNotification({ message: `blog not added - ${error.response.data.error}`, class: 'error' }))
  //   }
  // }


  // const updateBlog = async (blogObject) => {
  //   try {
  //     console.log('updating', blogObject)
  //     const changedBlog = await blogService.update(blogObject)
  //     const response = blogs.map(blog => blog.id === blogObject.id ? changedBlog : blog )
  //     setBlogs(response)
  //   } catch(error) {
  //     // notify(`blog not changed - ${error.response.data.error}`, 'error')
  //     dispatch(setNotification({ message: `blog not changed - ${error.response.data.error}`, class: 'error' }))
  //     console.log(error)
  //   }
  // }

  // const removeBlog = async (blogObject) => {
  //   try {
  //     if(window.confirm(`remove ${blogObject.title} by ${blogObject.author}?`)) {
  //       blogService.deleteBlog(blogObject.id)
  //       const filteredBlogs = blogs.filter((blog) => blog.id !== blogObject.id)
  //       setBlogs(filteredBlogs)
  //     }
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  if (user === null) {
    return (
      <div>
        {/* { !notification ? null : <div className={ notification.type === 'success' ? 'success' : 'error' }>{notification.message}</div> } */}
        <Notification />
        <h2>Login to the application</h2>
        <form id="loginForm" onSubmit={handleLogin}>
          <div>
            <input
              id='username'
              type='text'
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
              placeholder='username'
            />
          </div>
          <div>
            <input
              id='password'
              type='password'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
              placeholder='password'
            />
          </div>
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>Logged in as {user.name}<button type='submit' onClick={handleLogout}>logout</button></div>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
        {/* <BlogForm createBlog={addBlog} /> */}
      </Togglable>
      <div className="blogs">
        {/* {[...blogs]
          .sort((a,b) => b.likes > a.likes ? 1 : -1)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              // userCheck={userCheck}
              owner={user.username === blog.user.username}
              updateBlog={updateBlog}
              removeBlog={removeBlog} />
          )} */}
        <BlogList user={user.username} />

        {/*REVIEW- https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them*/}
      </div>
    </div>
  )

}

export default App