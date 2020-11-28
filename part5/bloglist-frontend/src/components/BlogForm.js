import React, { useState } from 'react'

const BlogForm = (props) => {

  const { createBlog } = props

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (e) => {
    console.log(createBlog)
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  // const { addBlog, title, author, url } = props
  return(
    <form onSubmit={addBlog}>
      <label>
        title:
        <input type="text" value={title} onChange={({ target }) => { setTitle(target.value) }} />
      </label>
      <br />
      <label>
        author:
        <input type="text" value={author} onChange={({ target }) => { setAuthor(target.value) }} />
      </label>
      <br />
    <label> 
        url: 
        <input type="text" value={url} onChange={({ target }) => { setUrl(target.value) }} />
      </label>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm