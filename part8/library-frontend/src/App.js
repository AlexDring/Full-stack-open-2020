import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const ErrorNotification = ({ notification }) => {
  if(!notification) {
    return null
  }
  return (
    <div style={{color:'red'}}>{notification}</div>
  ) 
}

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState("")
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if(localStorage.getItem('logged-in-user')) {
      setToken(localStorage.getItem('logged-in-user'))
    }
  },[])

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  } 

  const logout = () => {
    setToken(null)
    localStorage.removeItem('logged-in-user')
    client.resetStore()
    setPage('login')
  }

  if(result.loading) {
    return <div>books loading...</div>
  }
  const books = result.data.allBooks
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? null : <button onClick={() => setPage('login')}>login</button> }
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button> : null}
        {token ? <button onClick={logout}>logout</button> : null}
      </div>
      <ErrorNotification notification={notification} />

      <Authors show={page === 'authors'} />

      <Books 
        show={page === 'books'}
        books={books} 
        />

      <NewBook
        notify={notify}
        show={page === 'add'}
        setPage={setPage}
      />
      <Recommendation 
        show={page === 'recommend'} 
        books={books}
      />
      
      <LoginForm 
        show={page === 'login'}
        notify={notify}
        setToken={setToken}
        setPage={setPage}
      />
      
    </div>

  )
}


export default App