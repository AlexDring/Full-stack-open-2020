import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
// import Logout from './components/Logout'
import User from './components/User'
import  Blog from './components/Blog'

import { initBlogs } from './reducers/blogReducer'
import { loadUser, userLogout } from './reducers/userReducer'
import userService from './services/users'

const App = () => {
  const [users, setUsers] = useState()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users))
  }, [])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      const parsed = JSON.parse(loggedInUser)
      dispatch(loadUser(parsed))
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(userLogout())
  }

  const padding = {
    padding: 5
  }

  if (loggedIn === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <em>{loggedIn.name} logged in <button type='submit' onClick={handleLogout}>logout</button></em>
      </div>
      <h2>blogs</h2>
      <Notification />
      {/* <Logout name={loggedIn.name} /> */}

      <Switch>
        <Route path='/users/:id'>
          <User users={users} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blogs={blogs} user={loggedIn} />
        </Route>
        <Route path='/' >
          <Home user={loggedIn} />
        </Route>
      </Switch>
    </div>)
}

export default App


// const handleLogin = async (event) => {
//   event.preventDefault()
//   console.log('Form Login', username, password)
//   try {
//     const user = await loginService.login({
//       username, password
//     })// this gets routed through services/login.js to the backend where the credentials are checked. If ok the username, name and token are stored in the user state.
//     blogService.setToken(user.token)
//     setUser(user)
//     window.localStorage.setItem('loggedInUser', JSON.stringify(user))
//     setUsername('')
//     setPassword('')
//   } catch(error) {
//     // notify(error.response.data.error, 'error')
//     dispatch(setNotification({ message: error.response.data.error, class: 'error' }))
//   }
// }


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