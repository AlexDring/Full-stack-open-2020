import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import User from './components/User'
import  Blog from './components/Blog'

import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { loadUser, userLogout } from './reducers/loginReducer'
import { Container, AppBar, Toolbar, IconButton, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  loginDetails: {
    marginLeft: 'auto'
  },
  homeContent: {
    padding: theme.spacing(8, 0, 6)
  }
}))

const App = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.loggedIn)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const classes = useStyles()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
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

  if (loggedIn === null) {
    return (
      <Container>
        <div className={classes.homeContent}>
          <Notification />
          <LoginForm />
        </div>
      </Container>
    )
  }
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <em className={classes.loginDetails}>{loggedIn.name} logged in <Button color="inherit"  type='submit' onClick={handleLogout}>logout</Button></em>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.homeContent}>
          <Container>
            <Notification />
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
          </Container>
        </div>
      </main>
    </>)
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