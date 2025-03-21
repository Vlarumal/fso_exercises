const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(400).send('There are no users in the DB')
  }

  if (!body.title || !body.url) {
    return res.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(blog.id)
    return res.status(204).end()
  } else {
    return res
      .status(401)
      .json({ error: 'you are not authorized to delete this blog' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  return res.json(updatedBlog)
})

module.exports = blogsRouter
