import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<Blogform /> Event handler is called with the right details', () => {
  const createBlog = jest.fn()

  let component = render(
    <BlogForm handleCreate={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Test blog author' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].author).toBe('Test blog author')
})