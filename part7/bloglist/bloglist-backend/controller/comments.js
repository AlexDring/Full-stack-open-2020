const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (request, response) => {
  const result = await Comment.find({}).populate('blog')
  response.json(result)
})

commentsRouter.post('/:id/comments', async(request, response) => {
  const blog = await Blog.findById(request.params.id) // find blog using :id in the url parameters

  const comment = new Comment(request.body)
  console.log('new Comment', comment)
  const savedComment = await comment.save() // Save comment

  blog.comments = blog.comments.concat(savedComment._id) // Concat comment id to blogs.comment
  await blog.save() // Save blog with new comment

  response.json(savedComment)
})

module.exports = commentsRouter