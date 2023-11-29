const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogList.map(
    blog => new Blog(blog)
  )
  const promiseArray = blogObjects.map(r => r.save())

  await Promise.all(promiseArray)
})

test('test that makes an HTTP GET request to the /api/blogs URL', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogList.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})