import React from 'react'
import {
  Link,
} from 'react-router-dom'

const User = ({ name, blogCount, id }) => (
  <tr>
    <td>
      <Link to={`/users/${id}`}>{name}</Link>
    </td>
    <td>{blogCount}</td>
  </tr>
)

const UsersTable = ({ users }) => (
  <div>
    <table>
      <thead>
        <tr>
          <td></td>
          <td><strong>blogs created</strong></td>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <User key={user.id} name={user.name} blogCount={user.blogs.length} id={user.id} />
        )}
      </tbody>
    </table>
  </div>
)

export default UsersTable