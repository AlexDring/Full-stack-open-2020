import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryWeather = ({capital}) => {
  const [capitalWeather, setCapitalWeather] = useState()

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
      .then(response => { 
        setCapitalWeather(response.data) 
      })
  }, [capital])
  
  if(capitalWeather) {

    return(
      <div>
        <h2>Weather in {capital} - {capitalWeather.current.weather_descriptions}!</h2>
        <img src={capitalWeather.current.weather_icons} alt={capitalWeather.current.weather_descriptions}></img>
        <div><strong>temperature: </strong>{capitalWeather.current.temperature} Celcius</div>
        <div><strong>wind: </strong>{capitalWeather.current.wind_speed} mph direction {capitalWeather.current.wind_dir} </div>
      </div>
    )   
  }
  return(
    <div>
      <h2>Weather in {capital}</h2>
      <p>Loading weather...</p>
    </div>
  )
}

export default CountryWeather