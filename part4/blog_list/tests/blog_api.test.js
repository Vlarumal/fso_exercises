const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.initialBlogs) {
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

    assert.strictEqual(body.length, helper.initialBlogs.length)
  })

  test('returns the unique identifier property id, not _id.', async () => {
    const { body } = await api.get('/api/blogs')

    assert(Object.keys(body[0]).includes('id'))
    assert(!Object.keys(body[0]).includes('_id'))
  })
})

describe('tests for post', () => {
  test('a valid blog can be added, length increased by one, saved correctly', async () => {
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

    const { body } = await api.get('/api/blogs')
    assert.strictEqual(body.length, helper.initialBlogs.length + 1)

    const latestBlog = body[body.length - 1]
    const { id, ...addedBlog } = latestBlog
    
    assert.deepStrictEqual(addedBlog, newBlog)
  })
})

after(async () => {
  await mongoose.connection.close()
})
