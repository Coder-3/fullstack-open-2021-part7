import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const hideWhenIsExpanded = { display: isExpanded ? 'none' : '' }
  const showWhenIsExpanded = { display: isExpanded ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    }

    likeBlog(blog.id, updatedBlog)
  }

  const handleDelete = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const removeButton = () => {
    if (user.username === blog.user.username) {
      return <button onClick={handleDelete} className="deleteButton">remove</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenIsExpanded} className="blogContracted">
        {blog.title} {blog.author}
        <button onClick={toggleExpanded} className="viewButton">View</button>
      </div>
      <div style={showWhenIsExpanded} className="blogExpanded">
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes <span className="blogLikes">{blog.likes}</span>
        <button onClick={handleLike} className="likeButton">like</button>
        <br></br>
        {blog.user.name}
        <br></br>
        {removeButton()}
        <br></br>
      </div>
    </div>
  )
}

export default Blog