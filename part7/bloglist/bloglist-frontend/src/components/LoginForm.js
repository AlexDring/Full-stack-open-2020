import React from 'react'
import { userLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    const login = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    dispatch(userLogin(login))
    e.target.username.value = ''
    e.target.password.value = ''
  }

  return(
    <div>
      <h2>Login to the application TEST</h2>
      <form id="loginForm" onSubmit={handleLogin}>
        <div>
          <input
            id='username'
            type='text'
            name='username'
            placeholder='username'
          />
        </div>
        <div>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='password'
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm