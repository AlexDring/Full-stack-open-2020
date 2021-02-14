import { useMutation, useQuery } from '@apollo/client'  
import React, { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from '../queries'

const Authors = ({ show, notify }) => {
  const [name, setName] = useState({ name: null })
  const [born, setBorn] = useState('')
  const [ updateBirthYear ] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })
  const result = useQuery(ALL_AUTHORS)
  
  if (!show) {
    return null
  }
  // const authors = []

  const submit = (e) => {
    e.preventDefault()
    console.log({ variables: { name, born } })
    updateBirthYear({ variables: { name, born } })
    setBorn('')
  }

  if(result.loading) {
    return(
      <div>authors loading...</div>
    )
  }
  
  const options = result.data.allAuthors.map(a =>(
    { value: a.name, label: a.name }
  ))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        < Select 
          options={options}
          onChange={event => setName(event.value)}
          placeholder="Select name"
        />
        <br />
        born: <input 
        type="number"
        value={born}
        onChange={({ target }) => setBorn(target.value)}
        />
        <br />
        <button type='submit'>update author</button>
      </form>
     
      
    </div>
  )
}

export default Authors
