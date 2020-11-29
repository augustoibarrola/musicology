import React, { useState, useEffect } from 'react'
import Dropdown from './Components/Dropdown'
import axios from 'axios'

const App = () => {

  // const spotify = Credentials()

  const data = [
    {value: 1, name: "A" },
    {value: 2, name: "B" },
    {value: 3, name: "C" }
]

const [token, setToken] = useState('')

useEffect(() => {
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic' + btoa('a8e7bf99837d4be583b6775b84b5ec87' + ':' + '713c72bae95a479caddcef458718abac')
    },
    data: 'grant_type=client_credentials'
  })
  .then(response => {
    console.log(response)
    console.log(response.data)
    console.log(response.data.access_token)
    setToken(response.data.access_token)
  })
}, [])
  
  return(
    <div> 
      <form onSubmit={() => {}}> 
        <Dropdown data={data}/>
        <Dropdown data={data}/>
        <button type="submit" >
          search
        </button>
      </form>
    </div>

  )
}

export default App 