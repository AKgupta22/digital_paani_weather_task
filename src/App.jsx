import { useState } from "react"
import axios from './utils/axios'
import { Alert, CircularProgress, TextField, Typography } from "@mui/material"
import { Button } from "@mui/material"
import WeatherCard from "./Components/WeatherCard"

function App() {

  const [city, setCity] = useState("")
  const [foreCast, setForeCast] = useState({})
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getGeoCoding = async () => {
    try {
      const response = await axios.get('geo/1.0/direct', {
        params: {
          limit: 1,
          q: city
        }
      })
      return response.data
    }
    catch (e) {
      console.log(e, 'error encountered while fetching geocoding');
      setIsLoading(false)
      return []
    }
  }

  const getWeatherForeCast = async (lat, lon) => {
    try {
      const response = await axios.get('data/2.5/weather', {
        params: {
          units: "metric",
          lat: lat,
          lon: lon
        }
      })
      setForeCast(response.data)
      setIsLoading(false)
    }
    catch (e) {
      console.log(e, 'error encountered while fetching geocoding');
      setIsLoading(false)
    }
  }

  const onSumbit = async (e) => {
    e.preventDefault()
    setError("")
    if (city.trim().length) {
      setIsLoading(true)
      const cities = await getGeoCoding()
      if (Array.isArray(cities) && cities.length) {
        const cityDetails = cities[0]
        const lat = cityDetails?.lat
        const lon = cityDetails?.lon
        getWeatherForeCast(lat, lon)
      }
      else {
        setIsLoading(false)
        setForeCast({})
        setError('No city found.')
      }
    }
    else setError('Enter a valid city name.')
  }

  return (
    <div className="info-container">
      <Typography sx={{ fontSize: '1.5rem', fontWeight: "800", color: '#fd6666' }}>
        Search Weather
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <form onSubmit={onSumbit} className="search-form">
        <TextField
          label="City Name"
          name="location"
          size="small"
          required
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" type="submit" size="small" disabled={isLoading}>{isLoading ? <CircularProgress size={20} /> : "Search"}</Button>
      </form>
      {
        Object.keys(foreCast).length ? <WeatherCard weatherData={foreCast} /> : null
      }
    </div>
  )
}

export default App
