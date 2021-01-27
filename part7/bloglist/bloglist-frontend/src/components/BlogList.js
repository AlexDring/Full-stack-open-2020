import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const byLikes = (a1, a2) => a2.likes - a1.likes //TODO - REWRITE and understand this .sort
  const sorted = blogs.sort(byLikes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    border: 'solid',
    marginBottom: 5
  }

  return (
    <div className="blogs">
      {sorted.map(blog =>
        // <Blog key={blog.id} blog={blog} owner={blog.user.username===user.username} />
        <div key={blog.id} style={blogStyle} id='single-blog'>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} likes: {blog.likes}
        </div>
      )}
    </div>
  )}

export default BlogList
