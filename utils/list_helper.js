const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  
  const totalLikes = blogs.reduce(reducer, 0)

  return totalLikes
}

const favoriteBlog = (blogs) => {
  const reducer = (accum, item) => {
    return item.likes > accum.likes
      ? accum = item
      : accum
  }
  
  const topBlog = blogs.reduce(reducer, blogs[0])

  const returnBlog = { 
    title: topBlog.title, 
    author: topBlog.author, 
    likes: topBlog.likes 
  }    

  return returnBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}