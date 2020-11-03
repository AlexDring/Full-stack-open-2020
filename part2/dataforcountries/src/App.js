import React, {useEffect, useState } from "react";
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'persons')

  const filterHandler = (e) => {
    const filterQuery = e.target.value;
    let filtered = countries.filter((country) => {
      return (
        country.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1
      );
    });
    setCountriesFilter(filtered);
  }
  console.log(countriesFilter);

  const FilterDisplay = (props) => {
    console.log(props);
    const {filtered} = props
    console.log('length', filtered.length);
    if (filtered.length > 10) {
      return(
        <p>Too many matches, please be more specific.</p>
      )
    } else if ( filtered.length === 1) {
      console.log(filtered[0]);
      return(
        <div>
          <h1>{filtered[0].name}</h1>
          <p>capital: {filtered[0].capital}</p>
          <p>population: {filtered[0].population}</p>
          <h2>Languages</h2>
          <ul>
              {filtered[0].languages.map((language) => {
                return <li key={language.name}>{language.name}</li>
            })}
          </ul>
          <img src={filtered[0].flag} alt={filtered[0].name + ' flag'} ></img>
        </div>
      )
    } else {
      return(
        filtered.map((country) => {
          <p key={country.name}>{country.name}</p> 
        }
        )
      )
    }  
  }
  
  return (
    <>
      <div>
        find countries <input onChange={filterHandler} />
      </div>
      <div>
        <FilterDisplay filtered={countriesFilter} />
      </div>
    </>
  )
};

export default App;
