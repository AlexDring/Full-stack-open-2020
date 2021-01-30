import loginService from '../services/login'
// import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN': {
    return action.payload
  }
  case 'LOGOUT': {
    return null
  }
  case 'SAVED_USER' : {
    return action.payload
  }
  default: return state
  }
}

export const userLogin = (user) => {
  console.log(user)
  return async dispatch => {
    try {
      const userCheck = await loginService.login(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(userCheck))
      // console.log(userCheck)
      dispatch({
        type: 'LOGIN',
        payload: userCheck
      })
    } catch(error) {
      dispatch(setNotification({ message: error.response.data.error, class: 'error' }))
    }
  }
}

export const userLogout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const loadUser = (user) => {
  return {
    type: 'SAVED_USER',
    payload: user
  }
}

export default userReducer