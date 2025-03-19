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

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Without likes',
      author: 'Nameless',
      url: 'https://test.com',
    }

    await api.post('/api/blogs').send(newBlog)

    const { body } = await api.get('/api/blogs')
    const latestBlog = body[body.length - 1]

    assert.strictEqual(latestBlog.likes, 0)
  })

  test('blog without title or url is not added', async () => {
    const blogNoTitle = {
      author: 'Nameless',
      url: 'https://test.com',
    }

    const blogNoUrl = {
      title: 'Where is url?',
      author: 'Nameless',
    }

    const blogNoTitleNoUrl = {
      author: 'Nameless',
    }

    await api.post('/api/blogs').send(blogNoTitle).expect(400)
    await api.post('/api/blogs').send(blogNoUrl).expect(400)
    await api.post('/api/blogs').send(blogNoTitleNoUrl).expect(400)
  })
})

describe('tests for delete', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(
      blogsAtEnd.length,
      helper.initialBlogs.length - 1
    )
  })
})

describe('tests for put', () => {
  test('a blog can be updated', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfter = await helper.blogsInDb()
    const blogAfterUpdateInDB = blogsAfter.find(
      (blog) => blog.id === blogToUpdate.id
    )

    assert.strictEqual(
      blogAfterUpdateInDB.likes,
      blogToUpdate.likes + 1
    )
  })
})

after(async () => {
  await mongoose.connection.close()
})
