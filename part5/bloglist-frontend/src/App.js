import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login' 
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser")
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
    // console.log(loggedInUser);
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ 
        username, password
      })// this gets routed through services/login.js to the backend where the credentials are checked. If ok the username, name and token are stored in the user state.
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername("")
      setPassword("")
    } catch(error) {
      notify(error.response.data.error, 'error')
      // console.log(exception)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.create(blogObject) 
      // console.log(addedBlog)
      setBlogs(blogs.concat(addedBlog)) 
      notify(`${addedBlog.title} by ${addedBlog.author} has been added`, 'success')
      setVisibility(!visibility)
    } catch(error) {
      notify(`blog not added - ${error.response.data.error}`, 'error')
    }
  }


  const changeBlog = async (blogObject) => {
    try {
      console.log("updating", blogObject)
      const changedBlog = await blogService.update(blogObject)
      const response = blogs.map(blog => blog.id === blogObject.id ? changedBlog : blog )
      setBlogs(response)
    } catch(error) {
      notify(`blog not changed - ${error.response.data.error}`, 'error')
      console.log(error)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      if(window.confirm(`remove ${blogObject.title} by ${blogObject.author}?`)) {
        blogService.deleteBlog(blogObject.id)
        const filteredBlogs = blogs.filter((blog) => blog.id !== blogObject.id)
        setBlogs(filteredBlogs)
      }
    } catch(error) {
      console.log(error)
    }
  }
  
  
  
  if (user === null) {
    return (
      <div>
        { !notification ? null : <div className={ notification.type === 'success' ? "success" : "error" }>{notification.message}</div> }
        <h2>Login to the application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input 
              type="text" 
              value={username} 
              name="username"
              onChange={({ target }) => setUsername(target.value)}  
              placeholder="username"
            />
          </div>
          <div>
            <input 
              type="password" 
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}  
              placeholder="password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
    <h2>blogs</h2>
    { !notification 
      ? null 
      : <div className={ notification.type === 'success' ? "success" : "error" }>
        {notification.message}
      </div> }
     <div>Logged in as {user.name}<button type="submit" onClick={handleLogout}>logout</button></div>
    <h2>create new</h2>
    <Togglable buttonLabel={"new note"}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
    
    {[...blogs]
      .sort((a,b) => b.likes > a.likes ? 1 : -1)
      .map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={changeBlog} removeBlog={removeBlog} />
    )} 
    {/*REVIEW- https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them*/}
   </div> 
  )

}

export default App