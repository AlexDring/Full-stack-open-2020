import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  ListItemText,
  Typography,
  List,
  ListItem,
  Breadcrumbs,
  Link } from '@material-ui/core'

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
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/users">
          Users
        </Link>
        <Typography color="textPrimary">{user.name}</Typography>
      </Breadcrumbs>
      <Typography variant='h1'>{user.name}</Typography>
      <Typography variant='h2'>Added Blogs</Typography>
      <List component="nav">
        {user.blogs.map(blog =>
          // <li key={blog.id}>{blog.title}</li>
          <ListItem key={blog.id} button>
            <ListItemText>
              {blog.title}
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Container>
  )
}

export default User