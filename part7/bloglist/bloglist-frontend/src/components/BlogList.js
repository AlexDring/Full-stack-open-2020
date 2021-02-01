import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Paper,
  Typography } from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const byLikes = (a1, a2) => a2.likes - a1.likes
  const sorted = blogs.sort(byLikes)

  const blogStyle = {
    padding: 30,
    margin : '16px 0'
  }
  const likes = {
    marginLeft: 'auto'
  }

  return (
    <div className="blogs">
      {sorted.map(blog =>
        <Paper variant='outlined' key={blog.id} style={blogStyle} id='single-blog'>
          <Typography variant='h6' component='h6'>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link> by {blog.author} <span style={likes}>likes: {blog.likes}</span>
          </Typography>
        </Paper>
      )}
    </div>
  )}

export default BlogList
