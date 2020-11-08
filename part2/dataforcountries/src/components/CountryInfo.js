import React from 'react'

const CountryInfo = ({ country }) => {
  const countryStyles = {
    maxWidth: 250
  }

  return(
  <div>
    <h1>{country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <h2>Languages</h2>
    <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>
      })}
    </ul>
    <img style={countryStyles} src={country.flag} alt={country.name + ' flag'} ></img>
  </div>
  )
}

export default CountryInfo