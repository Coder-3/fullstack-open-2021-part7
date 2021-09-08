import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)

    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer