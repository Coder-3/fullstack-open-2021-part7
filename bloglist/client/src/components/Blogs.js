import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'

const Blog = ({ blog, id }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} id={blog.id} />
      )}
    </div>
  )
}

export default Blogs