import React, { useState } from 'react'
import Dropdown from './Components/Dropdown'
import axios from 'axios'

const App = () => {

  const data = [
    {value: 1, name: "A" },
    {value: 2, name: "B" },
    {value: 3, name: "C" }
]

const [token, setToken] = useState('')

  return(
    <div> 
      <form onSubmit={() => {}}> 
        <Dropdown data={data}/>
        <button type="submit" >
          search
        </button>
      </form>
    </div>

  )
}

export default App 