const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    await new Blog(blog).save()
  }
})

describe('tests for get', () => {
  test('blogs are returned as json', async () => {
    const { body } = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is a correct amount of blogs', async () => {
    const { body } = await api.get('/api/blogs')

    assert.strictEqual(body.length, initialBlogs.length)
  })
})

describe('tests for post', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
