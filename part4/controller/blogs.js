const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
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

// get authorisation header
// const getToken = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     // and return token after bearer
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // send request to authorisation function above
  // const token = getToken(request)

  // verify token
  // eslint-disable-next-line no-undef
  const verifiedToken = await jwt.verify(request.token, process.env.SECRET)
  // if it can't be verified 401 error
  if (!verifiedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  // eslint-disable-next-line quotes
  // let userId = !body.userId ? "5fba74e4243b52dc8c00a60b" : body.userId

  // attach id to new blog post by filling find user below
  const user = await User.findById(verifiedToken.id)// wait for the user to be found by the id sent in the request to create the blog post.
  // console.log('user._id - ', user._id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes:  body.likes,
    date: new Date(),
    user: user._id // why is this _id and not id???
  })


  if(((blog.title  === undefined ) || (blog.url === undefined))) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id) // concat the id to the blogs array in the users db for that specific user
    await user.save()
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
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
  // console.log('token', verifiedToken, typeof verifiedToken.username)
  // get blog
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === verifiedId.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(202).end()
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter