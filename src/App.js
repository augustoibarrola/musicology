import React, { useState, useEffect } from 'react'
import Dropdown from './Components/Dropdown'
import axios from 'axios'

const App = () => {

  // const spotify = Credentials()

  const options = [
    {value: 1, name: "A" },
    {value: 2, name: "B" },
    {value: 3, name: "C" }
  ]

  const [token, setToken] = useState('')
  const [genre, setGenre] = useState({ selectedGenre: '', listOfGenresFromAPI: [] })

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)     
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
    .then(tokenResponse => {
      setToken(tokenResponse.data.access_token)

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US',{
        method: 'GET', 
        headers: {
          'Authorization' : 'Bearer ' + tokenResponse.data.access_token 
        },
      })
      .then(getSearchResponse => { 
        setGenre({
          selectedGenre: genre.selectedGenre,
          listOfGenresFromAPI: getSearchResponse.data.categories.items
        })
      })

    })
  }, [ genre.selectedGenre, process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET ])

  const genreChanged = (value) => {
    setGenre({
      selectedGenre: value, 
      listOfGenresFromAPI: genre.listOfGenresFromAPI
    })
  }
  
  return(
    <div> 
      <form onSubmit={() => {}}> 
        <Dropdown options={genre.listOfGenresFromAPI} selectedValue={ genre.selectedGenre } changed={genreChanged}/>
        <Dropdown options={options}/>
        <button type="submit" >
          search
        </button>
      </form>
    </div>

  )
}

export default App 