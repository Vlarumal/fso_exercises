const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const mostLikes = Math.max(...likes)
  const favorite = blogs.find((blog) => blog.likes === mostLikes)

  return favorite
}

const mostBlogs = (blogs) => {
  const counted = _.countBy(blogs, 'author')
  const most = _.max(Object.values(counted))

  const [author, blogsCount] = Object.entries(counted).find(
    ([key, value]) => value === most
  )

  return {
    author: author,
    blogs: blogsCount,
  }
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorsWithLikes = _.map(groupedByAuthor, (value, key) => ({
    author: key,
    likes: totalLikes(value),
  }))

  const { author, likes } = _.maxBy(authorsWithLikes, 'likes')
  return {
    author,
    likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
