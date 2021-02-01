import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import { Typography } from '@material-ui/core'

const Home = () => {
  const blogFormRef = React.createRef() // TODO https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref

  return(
    <>
      <Typography variant='h3' gutterBottom	>
        blogs
      </Typography>
      <Typography variant='h5' gutterBottom>
        create new
      </Typography>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </>
  )}

export default Home