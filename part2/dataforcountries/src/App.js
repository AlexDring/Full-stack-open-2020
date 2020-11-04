import React, {useEffect, useState } from "react";
import axios from 'axios'
import FilterDisplay from './components/FilterDisplay'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([])
  const [filterValue, setFilterValue] = useState('')

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
    setFilterValue(filterQuery)
    let filtered = countries.filter((country) => {
      return (
        country.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1
      );
    });
    setCountriesFilter(filtered);
  }
  
  return (
    <>
      <div>
        find countries <input value={filterValue} onChange={filterHandler} />
      </div>
      <div>
        <FilterDisplay filtered={countriesFilter} setFilterValue={setFilterValue} setCountriesFilter={setCountriesFilter} countries={countries} />
      </div>
    </>
  )
};

export default App;
