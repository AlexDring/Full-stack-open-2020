import React from 'react'
import { useField, useCountry } from './hooks/index'

const Country = (props) => {
  console.log('PROPS', props);
  const { country } = props
  if (!country.found) {
    return null
  }

  if (country.found === 'not found') {
    return (
      <div>
        not found...
      </div>
    )
  }
  return(
    <div>
      <h3>{country.found.name} </h3>
      <div>capital {country.found.capital} </div>
      <div>population {country.found.population}</div> 
      <img src={country.found.flag} height='100' alt={`flag of ${country.found.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const country = useCountry()

  const fetch = (e) => {
    e.preventDefault()
    country.set(nameInput.value)
  }
  
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App