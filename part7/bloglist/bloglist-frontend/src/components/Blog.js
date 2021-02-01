import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { increaseLikes, deleteBlog, newComment } from '../reducers/blogReducer'
import {
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  TextField,
  Breadcrumbs,
  Divider,
  makeStyles } from '@material-ui/core'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { setNotification } from '../reducers/notificationReducer'

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  }
}))

const Blog = ({ blogs, user }) => {
  const classes = useStyles()
  const [clicked, setClicked] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const updateBlog = (id) => {
    setClicked(true)
    const likeID = blogs.find(blog => blog.id === id)
    dispatch(increaseLikes(likeID))
  }

  const addComment = (e) => {
    e.preventDefault()
    const comment = {
      comment: e.target.comment.value,
      blogId: blog.id
    }
    e.target.comment.value = ''
    dispatch(newComment(comment))
  }

  const removeBlog = (id) => {
    dispatch(deleteBlog(id))
    history.push('/')
    dispatch(setNotification({ message: 'blog has been deleted', class: 'success' }))
  }

  if (!blog) {
    return null
  }

  return(
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Blogs
        </Link>
        <Typography color="textPrimary">{blog.title}</Typography>
      </Breadcrumbs>
      <Typography variant='h1'>
        <Link target="_blank" rel="noopener" href={blog.url}>{blog.title}</Link>
      </Typography>
      <Typography variant='subtitle2' gutterBottom>
        written by {blog.author}
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        added by {blog.user.name}
        {blog.user.username===user.username && <Button color='secondary' onClick={() => removeBlog(blog.id)}>delete</Button>}
      </Typography>
      <div>
        <IconButton aria-label="like article" onClick={() => updateBlog(blog.id)}>
          {clicked ? <FavoriteIcon color='secondary' ></FavoriteIcon> : <FavoriteBorderIcon color="secondary"></FavoriteBorderIcon> }
        </IconButton>{blog.likes}
      </div>
      <Divider className={classes.divider} />
      <div className={classes.comments}>
        <Typography variant='h4'>
          comments
        </Typography>
        <form onSubmit={addComment}>
          <TextField type="text" name="comment">add comment</TextField><Button type="submit">add comment</Button>
        </form>

        <List>
          {blog.comments.map(comment =>
            <ListItem key={comment._id}>
              <ListItemText>
                {comment.comment}
              </ListItemText>
            </ListItem>
          )}
        </List>
      </div>
    </div>
  )
}

export default Blog