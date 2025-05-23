const bcrypt = require('bcryptjs')
const { test, beforeEach, describe, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukai',
      password: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('users with username or password less than 3 characters are not created', async () => {
    const invalidUser = {
      username: 'ab',
      name: 'aba',
      password: 'ab',
    }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usernames = (await helper.usersInDb()).map(
      (u) => u.username
    )
    assert(!usernames.includes(invalidUser.username))

    const { error } = response.body
    assert(
      error.includes(
        'Username and Password must be at least 3 characters long'
      )
    )
  })
})

after(async () => {
  await mongoose.connection.close()
})
