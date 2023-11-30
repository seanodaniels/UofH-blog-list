const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// BEGIN ROUTES
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.title && body.url) {

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else {
    const errorMessage = !body.title
      ? `Missing title`
      : `Missing url`
    
    console.log(errorMessage)
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  } 

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updateBlog)
})

// END ROUTES

module.exports = blogsRouter