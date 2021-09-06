import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreate }) => {
  const addBlog = event => {
    event.preventDefault()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    handleCreate(blogObject)
  }

  BlogForm.propTypes = {
    handleCreate: PropTypes.func.isRequired
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          name="title"
          id="title"
        />
        author:
        <input
          name="author"
          id="author"
        />
        url:
        <input
          name="url"
          id="url"
        />
        <button type="submit" id="submitBlog">create</button>
      </form>
    </div>
  )
}

export default BlogForm