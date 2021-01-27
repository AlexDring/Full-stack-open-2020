const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  console.log('WTF', blog)
  response.json(blog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  console.log('THIS', request.params.id, request.body)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  console.log('updatedBlog', updatedBlog)
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // get token
  // eslint-disable-next-line no-undef
  const verifiedToken = jwt.verify(request.token, process.env.SECRET)
  const verifiedId = verifiedToken.id
  // if it can't be verified 401 error
  if (!verifiedId) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  console.log(request.params.id)
  // console.log('token', verifiedToken, typeof verifiedToken.username)
  // get blog
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  if ( blog.user.toString() === verifiedId.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(202).end()
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter