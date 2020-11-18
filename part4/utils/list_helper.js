// var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const likesSum = blogs.reduce(function(a,c) {
    return a + c.likes
  }, 0)
  return likesSum
}

const favouriteBlog = (blogs) => {
  // reduce if blogs.likes is high keep else next
  const highest = blogs.reduce(function(a, c) {
    // console.log('keep', a, 'compared', c)
    return a.likes > c.likes ? a : c
  }, 0)

  return(highest)
}

// const mostBlogs = (blogs) => {
//   const countBlogs = _.countBy(blogs, function(blog) {
//     return blog.author
//   })
//   console.log(countBlogs)
// }

module.exports = {
  dummy, totalLikes, favouriteBlog
}