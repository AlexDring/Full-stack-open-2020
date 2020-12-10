const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
    switch (action.type) {
      case 'SET_NOTIFICATION': 
        return action.data
      case 'CLEAR_NOTIFICATION': 
        return null
    default: // if none of the above matches, code comes here
    }
  return state
}

// export const setNotification = notification => {
//   return {
//     type: 'SET_NOTIFICATION',
//     data: notification
//   }
// }
export const setNotification = (notification, time) => {
  // console.log('notification', notification);
  // console.log('time', time);
  return dispatch => {
    dispatch({ type: 'SET_NOTIFICATION', data: notification })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' }) // why does dispatching null not work?
   }, time * 1000)
  }
}

export default notificationReducer