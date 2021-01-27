import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
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
  }
  // const { addBlog, title, author, url } = props
  return(
    <>
      <form onSubmit={addBlog} className='blogFormDiv'>
        <label>
          title:
          {/* <input id='title' type="text" value={title} onChange={({ target }) => { setTitle(target.value) }} /> */}
          <input id='title' type="text" name="title" />
        </label>
        <br />
        <label>
          author:
          {/* <input id='author' type="text" value={author} onChange={({ target }) => { setAuthor(target.value) }} /> */}
          <input id='author' type="text" name="author" />
        </label>
        <br />
        <label>
          url:
          {/* <input id='url' type="text" value={url} onChange={({ target }) => { setUrl(target.value) }} /> */}
          <input id='url' type="text" name="url" />
        </label>
        <button id='create-blog' type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm