import React from 'react'
import styled from 'styled-components'
import { FormContainer, ResponsiveInput } from '../global.styled'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginFormContainer = styled.div`
  text-align: center;
`

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
    <LoginFormContainer>
      <h2>log in to application</h2>
      <FormContainer onSubmit={handleLogin}>
        username
        <ResponsiveInput
          type="text"
          name="username"
          id="username"
        />
        password
        <ResponsiveInput
          type="password"
          name="password"
          id="password"
        />
        <button type="submit" id="loginButton">login</button>
      </FormContainer>
    </LoginFormContainer>
  )
}

export default Login