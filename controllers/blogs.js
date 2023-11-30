const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// BEGIN ROUTES
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
// END ROUTES

module.exports = blogsRouter