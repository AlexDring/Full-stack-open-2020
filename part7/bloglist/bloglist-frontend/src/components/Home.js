import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = () => {
  const blogFormRef = React.createRef() // TODO https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref

  return(
    <>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
      {/* <BlogList user={user.username} /> */}
    </>
  )}

export default Home