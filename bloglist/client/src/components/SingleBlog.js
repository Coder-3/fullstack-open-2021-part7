import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const SingleBlog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)

  if (blogs.length === 0) {
    return null
  }

  const blog = blogs.find(b => b.id === id)

  const handleLike = event => {
    event.preventDefault()

    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    }

    dispatch(likeBlog(blog.id, updatedBlog))
  }

  const handleDelete = event => {
    event.preventDefault()

    dispatch(deleteBlog(id))
    history.push('/')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button onClick={handleLike}>like</button>
      <button onClick={handleDelete}>remove</button>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default SingleBlog