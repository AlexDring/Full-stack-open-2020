const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
    switch (action.type) {
      case 'SET_NOTIFICATION': {
        // const notify = [action.data, action.timer]
        return {
          message: action.data,
          timerID: action.timer
        }
      }
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
export const setNotification = (setNotification, time) => {
  // console.log('notification', notification);
  // console.log('time', time);
  return (dispatch, getState) => {
    const { notification } = getState()
    console.log('notification state: ', notification);

    if(notification) {
      clearTimeout(notification.timerID)
    }
    let timerSet = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, time * 1000)
    
    dispatch({ type: 'SET_NOTIFICATION', data: setNotification, timer: timerSet })
    
    
    // function timer() {
    //   timerSet = setTimeout(() => {
    //   dispatch({ type: 'CLEAR_NOTIFICATION' })
    //   }, time * 1000)
    // }
    // function clearTimer(timerSet) {
    //   clearTimeout(timerSet)
    // }
    // console.log('isit?', notification);
    // if(notification) {
    //   clearTimer(timerSet)
    // }
    // dispatch({ type: 'SET_NOTIFICATION', data: setNotification })
    // timer()
    // console.log('timerSet', timerSet);
    
  }
}

export default notificationReducer