import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const style = {
    padding: 5
  }

  return (
    <nav style={style}>
      <Link to="/">blogs</Link>
      <Link to="users">users</Link>
      {user !== null ?
        <div>
          {user.name} logged in
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </div>
        :
        <div>
          Please login
        </div>
      }
    </nav>
  )
}

export default Navigation