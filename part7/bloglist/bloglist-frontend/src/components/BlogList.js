import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = (props) => {
  console.log(props)
  const { user } = props
  const blogs = useSelector(state => state.blogs)
  const byLikes = (a1, a2) => a2.likes - a1.likes
  const sorted = blogs.sort(byLikes)

  console.log('BLOGS', blogs)
  return (
    <>
      {sorted.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </>
  )}

export default BlogList