import React, {useEffect, useState } from "react";
import axios from 'axios'
import FilterDisplay from './components/FilterDisplay'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterHandler = (e) => {
    const filterQuery = e.target.value;
    setFilterValue(filterQuery)
    let filtered = countries.filter((country) => {
      return (
        country.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1
      );
    });
    setCountriesFilter(filtered);
  }

  function handleShowClick(country) {
    setFilterValue(country.name);
    setCountriesFilter([country]);
  }
  
  return (
    <>
      <div>
        find countries <input value={filterValue} onChange={filterHandler} />
      </div>
      <div>
        <FilterDisplay 
        filtered={countriesFilter} 
        countries={countries} 
        handleShowClick={handleShowClick}
        />
      </div>
    </>
  )
};

export default App;
