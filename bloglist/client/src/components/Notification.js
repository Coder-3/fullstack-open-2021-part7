import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    if (!state.notification) {
      return null
    }

    return {
      message: state.notification.message,
      type: state.notification.type
    }
  })

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification