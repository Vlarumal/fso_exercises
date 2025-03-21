const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.initialBlogs) {
    await new Blog(blog).save()
  }

  await User.deleteMany({})

  const user = {
    username: 'mluukai',
    password: 'salainen',
  }

  await request(app).post('/api/users').send(user)

  const response = await request(app)
    .post('/api/login')
    .send(user)
    .expect(200)

  token = response.body.token
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
    const newBlog = helper.initialBlogs[0]

    await request(app)
      .post('/api/blogs')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await api.get('/api/blogs')
    assert.strictEqual(body.length, helper.initialBlogs.length + 1)

    const latestBlog = body[body.length - 1]
    const { id, ...addedBlog } = latestBlog

    assert.deepStrictEqual(addedBlog.title, newBlog.title)
  })

  test('a blog can`t be added unauthorized', async () => {
    const wrongToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVrYWkiLCJpZCI6IjY3ZGQyZDI5MjM3YjY4Y2UyMzk3ZWQwOCIsImlhdCI6MTc0MjU1ODI4MH0.1DZwTFrEo7ZuCp2a_1aNoCWqOEfG30-kgceYHRbsW1w'
    await request(app)
      .post('/api/blogs')
      .set({
        Authorization: `Bearer ${wrongToken}`,
      })
      .send(helper.initialBlogs[1])
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Without likes',
      author: 'Nameless',
      url: 'https://test.com',
    }

    await api
      .post('/api/blogs')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(newBlog)

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

    await api
      .post('/api/blogs')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(blogNoTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(blogNoUrl)
      .expect(400)

    await api
      .post('/api/blogs')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(blogNoTitleNoUrl)
      .expect(400)
  })
})

describe('tests for delete', () => {
  test('a blog can be deleted', async () => {
    const newBlog = {
      title: 'Deleted',
      author: 'Mr. D',
      url: 'https://deleted.com',
    }

    await api
      .post('/api/blogs/')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(newBlog)
      .expect(201)

    const blogsBeforeDeletion = await helper.blogsInDb()

    const blogToDelete =
      blogsBeforeDeletion[blogsBeforeDeletion.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()

    const titles = blogsAfterDeletion.map((blog) => blog.title)
    assert(!titles.includes(newBlog.title))
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
