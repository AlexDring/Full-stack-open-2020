import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = () => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(null)

  const set = (name) => {
    setCountry(name)
  }

  useEffect(() => {
    if(country) {
      const fetchData = async () => {
      try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
        setFound(result.data[0])
      } catch {
        setFound('not found')
      }
    }
    fetchData()
    } else {
      setCountry(null)
    }
  }, [country])

  return { 
    found,
    set
  }
}
