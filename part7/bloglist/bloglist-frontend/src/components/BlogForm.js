import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const BlogForm = () => {
  const classes = useStyles()
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }

    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    dispatch(createBlog(newBlog))
    dispatch(setNotification({ message: `${newBlog.title} has been added.`, class: 'success' }))
  }

  return(
    <>
      <form onSubmit={addBlog} className={classes.root}>
        <TextField label='Title' id='title' type="text" name="title" />
        <TextField label='Author' id='author' type="text" name="author" />
        <TextField label='Url' id='url' type="text" name="url" />
        <Button variant='outlined' color='primary' id='create-blog' type="submit">create</Button>
      </form>
    </>
  )
}

export default BlogForm