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
  const user = users.find(user => user.id === id)
  if (!user) {
    return null
  }

  return(
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/users">
          Users
        </Link>
        <Typography color="textPrimary">{user.name}</Typography>
      </Breadcrumbs>
      <Typography variant='h1'>{user.name}</Typography>
      <Typography variant='h4'>Added Blogs</Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
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