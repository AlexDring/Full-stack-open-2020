import React from 'react'
import CountryInfo from './CountryInfo'
import CountryWeather from './CountryWeather'

const FilterDisplay = (props) => {
  const { filtered, setFilterValue, setCountriesFilter } = props

  function handleShowClick(country) {
    setFilterValue(country.name);
    setCountriesFilter([country]);
  }

  if (filtered.length > 10) {
    return(
      <p>Too many matches, please be more specific.</p>
    )
  } else if ( filtered.length === 1) {
    return(
      <div>
        <CountryInfo country={filtered[0]} />
        <CountryWeather capital={filtered[0].capital} />
      </div>
    )
  } else {
    return(
      filtered.map((country) => {
        return([  
          <div key={country.name}>{country.name} <button type="submit" onClick={() => handleShowClick(country)}>show</button></div>
        ])
        }
      )
    )
  }  
}

export default FilterDisplay