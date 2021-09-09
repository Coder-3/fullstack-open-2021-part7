import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()

    dispatch({
      type: 'INIT_USERS',
      users: users.data
    })
  }
}

export default usersReducer