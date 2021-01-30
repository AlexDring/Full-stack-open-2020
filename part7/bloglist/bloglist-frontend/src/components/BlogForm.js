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
    console.log(e.target.title.value)
    console.log(newBlog.title)
    dispatch(setNotification({ message: `${newBlog.title} has been added.`, class: 'success' }))
  }
  // const { addBlog, title, author, url } = props
  return(
    <>
      <form onSubmit={addBlog} className={classes.root}>
        <TextField label='Title' id='title' type="text" name="title" />
        {/* <label>
          title: */}
        {/* <input id='title' type="text" value={title} onChange={({ target }) => { setTitle(target.value) }} /> */}
        {/* <input id='title' type="text" name="title" /> */}
        {/* </label> */}
        <br />
        <TextField label='Author' id='author' type="text" name="author" />
        {/* <label>
          author: */}
        {/* <input id='author' type="text" value={author} onChange={({ target }) => { setAuthor(target.value) }} /> */}
        {/* <input id='author' type="text" name="author" /> */}
        {/* </label> */}
        <br />
        <TextField label='Url' id='url' type="text" name="url" />
        {/* <label>
          url: */}
        {/* <input id='url' type="text" value={url} onChange={({ target }) => { setUrl(target.value) }} /> */}
        {/* <input id='url' type="text" name="url" /> */}
        {/* </label> */}
        <br />
        <Button variant='outlined' color='primary' id='create-blog' type="submit">create</Button>
        {/* <button id='create-blog' type="submit">create</button> */}
      </form>
    </>
  )
}

export default BlogForm