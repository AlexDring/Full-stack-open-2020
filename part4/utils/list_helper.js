var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = () => {
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

const mostBlogs = (blogs) => {
  const countBlogs = _
    .chain(blogs)
    .countBy('author')
    .toPairs()
    .maxBy()
    .value()

  return {
    author: countBlogs[0],
    blogs: countBlogs[1]
  }
}

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')
  let newArray = []

  for (const name in groupedBlogs) {
    let likesTotals = {
      author: name,
      likes: groupedBlogs[name].reduce((a,c) => {
        return a + c.likes
      },0)
    }

    newArray.push(likesTotals)
  }

  return _.maxBy(newArray, function(o) { return o.likes })
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}