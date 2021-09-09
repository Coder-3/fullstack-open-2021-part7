import React from 'react'
// import { BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
// } from 'react-router-dom'

const User = ({ name, blogCount }) => (
  <tr>
    <td>{name}</td>
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
          <User key={user.id} name={user.name} blogCount={user.blogs.length} />
        )}
      </tbody>
    </table>
  </div>
)

export default UsersTable