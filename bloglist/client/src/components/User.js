import React from 'react'
import { Section } from '../global.styled'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id

  if (users.length === 0) {
    return null
  }

  const user = users.find(u => u.id === id)

  return (
    <div>
      <Section>
        <h2>{user.name}</h2>
      </Section>
      <Section>
        <strong>added blogs</strong>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </Section>
    </div>
  )
}

export default User