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

console.log(process.env.REACT_APP_CLIENT_ID)

const [token, setToken] = useState('')

useEffect(() => {
  axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        // 'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_ID)     
        'Authorization': 'Basic a8e7bf99837d4be583b6775b84b5ec87:713c72bae95a479caddcef458718abac' 
        // Authorization: Basic *<base64 encoded client_id:client_secret>* 
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(console.log)
  // .then(response => {
  //   setToken(response.data.access_token)
  //   axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
  //       method: 'GET',
  //       headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
  //   })
  //   .then(data => console.log(data))
      
  // })
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