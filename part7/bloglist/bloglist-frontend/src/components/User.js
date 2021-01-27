import React from 'react'
import { useParams } from 'react-router-dom'

const User = (props) => {
  console.log(props)
  const { users } = props
  const id = useParams().id
  if (!users) {
    return null
  }
  const user = users.find(user => user.id === id)
  console.log(user)
  return(
    <div>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User