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

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()

})

test('verify that new entries can be created via POST', async () => {
  const newEntry = {
    title: 'This is a test for a new blog list entry.',
    author: 'Sean ODaniels',
    url: 'https://odaniels.org',
    likes: 88
  }

  await api
    .post('/api/blogs')
    .send(newEntry)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const modifiedDb = await helper.allEntriesInDb()

  expect(modifiedDb).toHaveLength(helper.initialBlogList.length + 1)

  const titles = modifiedDb.map(r => r.title)

  expect(titles).toContain(
    'This is a test for a new blog list entry.'
  )
})

test('verifies that if like property is missing it is set to 0', async () => {
  const entryWithoutLikes = {
    title: 'This is a test for an absent like property a8923iIdkzqlp88.',
    author: 'Sean ODaniels',
    url: 'https://odaniels.org'
  }

  await api
    .post('/api/blogs')
    .send(entryWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const modifiedDb = await helper.allEntriesInDb()

  const newEntry = modifiedDb.find(entry => entry.title === 'This is a test for an absent like property a8923iIdkzqlp88.')

  expect(newEntry.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})