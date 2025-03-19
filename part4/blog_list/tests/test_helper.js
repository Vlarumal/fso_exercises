const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Exploring the Wonders of Space',
    author: 'Astrid Starlight',
    url: 'https://astridstarlight.spaceblog.com',
    likes: 1,
  },
  {
    title: 'The Art of Cooking Vegan',
    author: 'Lily Greenleaf',
    url: 'https://lilygreenleaf.cookingblog.com',
    likes: 2,
  },
  {
    title: 'Understanding AI and Its Future',
    author: 'Maxwell Tech',
    url: 'https://maxwelltech.aiinsights.com',
    likes: 8,
  },
  {
    title: 'Traveling the World on a Budget',
    author: 'Samantha Wanderer',
    url: 'https://samanthawanderer.travelblog.com',
    likes: 5,
  },
  {
    title: 'The Magic of Photography',
    author: 'Ethan Lensman',
    url: 'https://ethanlensman.photographyblog.com',
    likes: 9,
  },
]

const nonExistingId = async () => {
  const blog = new Blog(initialBlogs[0])
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
