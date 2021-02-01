import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'

const Logout = (props) => {
  const dispatch = useDispatch()
  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(userLogout())
  }
  return(
    <div>
      <div>Logged in as {props.name}</div>
      <br />
      <button type='submit' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Logout