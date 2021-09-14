import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, commentOnBlog, deleteBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const addComment = event => {
    event.preventDefault()

    const comment = event.target.comment.value

    const blogObject = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes,
      url: blog.url,
      user: blog.user.id,
      comments: [...blog.comments, comment]
    }

    dispatch(commentOnBlog(blog.id, blogObject))
  }

  return (
    <form onSubmit={addComment}>
      <input name="comment" />
      <button type="submit">add comment</button>
    </form>
  )
}

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

  const generateKey = () => Math.floor(Math.random() * 10000)

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
      <strong>comments</strong>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map(comment =>
          <li key={generateKey()}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default SingleBlog