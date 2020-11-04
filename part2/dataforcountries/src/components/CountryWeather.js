import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryWeather = ({capital}) => {
  const [capitalWeather, setCapitalWeather] = useState()

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    console.log('weather effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => { 
        console.log('weather promise fulfilled')
        setCapitalWeather(response.data) 
      })
  }, [capital])
  console.log('weather render')
  
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
    <p>Loading weather...</p>
  )
}

export default CountryWeather