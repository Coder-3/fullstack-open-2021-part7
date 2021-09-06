const blankNotification = {
  message: '',
  type: ''
}

const notificationReducer = (state = blankNotification, action) => {
  switch (action.type) {
  case 'SUCCESS_NOTIFICATION':
    return {
      message: action.message,
      type: 'success'
    }
  case 'ERROR_NOTIFICATION':
    return {
      message: action.message,
      type: 'error'
    }
  case 'REMOVE_NOTIFICATION':
    return blankNotification
  default:
    return state
  }
}

export const setNotification = (message, type, duration) => {
  return async dispatch => {
    dispatch({
      type,
      message
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, duration)
  }
}

export default notificationReducer