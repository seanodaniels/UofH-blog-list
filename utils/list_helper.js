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

module.exports = {
  dummy,
  totalLikes,
}