import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const user = useSelector(state => state.user)

  if (user) {
    return null
  }

  const dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    try {
      dispatch(loginUser(credentials))
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 'ERROR_NOTIFICATION', 5000))
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" id="loginButton">login</button>
      </form>
    </div>
  )
}

export default Login