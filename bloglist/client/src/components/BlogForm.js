import React from 'react'
import PropTypes from 'prop-types'
import { FormContainer, ResponsiveInput } from '../global.styled'

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
      <FormContainer onSubmit={addBlog}>
        title
        <ResponsiveInput
          name="title"
          id="title"
        />
        author
        <ResponsiveInput
          name="author"
          id="author"
        />
        url
        <ResponsiveInput
          name="url"
          id="url"
        />
        <button type="submit" id="submitBlog">create</button>
      </FormContainer>
    </div>
  )
}

export default BlogForm