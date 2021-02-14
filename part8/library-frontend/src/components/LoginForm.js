import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const { show, setToken, setPage, notify } = props
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [ loginUser, result ] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })
  
  useEffect(() => {      
    if(result.data) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('logged-in-user', token)
        setPage('authors')
      }
  }, [result.data]) // eslint-disable-line

  if(!show) {
    return null
  }


  const loginSubmit = (e) => {
    e.preventDefault()
    loginUser({ variables: { username, password } })
    setPassword('')
    setUsername('')
  }


  return(
    <div>
      <form onSubmit={loginSubmit}>
        username: <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        <br />
        password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm