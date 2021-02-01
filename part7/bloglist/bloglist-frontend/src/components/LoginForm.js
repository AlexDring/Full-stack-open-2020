import React from 'react'
import { useHistory } from 'react-router-dom'

import { userLogin } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import {
  TextField,
  Typography,
  Container,
  Button } from '@material-ui/core'

const LoginForm = () => {
  const history = useHistory()
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
    history.push('/')
  }

  const loginStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '250px'
  }

  return(
    <Container>
      <Typography variant="subtitle1">
        Login to the application
      </Typography>
      <form style={loginStyle} id="loginForm" onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          label='username'
          id='username'
          name='username'
          placeholder='username'/>
        <TextField
          variant="outlined"
          label='password'
          type='password'
          name='password'
          placeholder='password'
        />
        <Button variant="contained" color="primary" id='login-button' type='submit'>
          login
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm