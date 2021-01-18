import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  // console.log('tonk', notification)

  if (!notification) {
    return null
  }

  return (
    <div className={ notification.class === 'success' ? 'success' : 'error' }>
      {notification.message}
    </div>
  )
}

export default Notification