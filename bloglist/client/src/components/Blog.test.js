import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Test blog title',
    author: 'Test blog author',
    user: {
      name: 'Test blog name',
      username: 'Test blog username'
    },
    url: 'Test blog url',
    likes: 2
  }

  const user = {
    name: 'Test blog name',
    username: 'Test blog username'
  }

  const likeBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likeBlog={likeBlog} />
    )
  })

  test('blog title rendered', () => {
    expect(component.container).toHaveTextContent(
      'Test blog title'
    )
  })

  test('blog author rendered', () => {
    expect(component.container).toHaveTextContent(
      'Test blog author'
    )
  })

  test('blog and author displayed', () => {
    const div = component.container.querySelector('.blogContracted')

    expect(div).not.toHaveStyle('display: none')
  })

  test('url and number of likes hidden', () => {
    const div = component.container.querySelector('.blogExpanded')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the view button, the blog shows its url and number of likes', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogExpanded')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls the prop event handler twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
