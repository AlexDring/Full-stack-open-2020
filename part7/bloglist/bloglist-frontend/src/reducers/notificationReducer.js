const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION': {
    return action.content
  }
  case 'CLEAR_NOTIFICATION':
    return null
  default: // if none of the above matches, code comes here
  }
  return state
}

export const setNotification = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }}

export default notificationReducer