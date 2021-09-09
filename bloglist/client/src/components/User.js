import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const User = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!user) {
    return null
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </div>
  )
}

export default User