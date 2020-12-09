import React, { useState, useEffect } from 'react'
import { Input, Dropdown } from 'semantic-ui-react'

const Search = ({ searchTypeOptions, spotifySearch }) => {

    const [searchType, setSearchType] = useState(searchTypeOptions[0]["value"])
    const [value, setValue] = useState('')

    const setSearchParam = (event) => {
        setSearchType(event.target.innerText)
    }

    return(
        <div>
            <form onSubmit={ event => { 
                spotifySearch(event, value, searchType) 
                setValue('')
                }}> 
                <Input 
                    as="submit"
                    label={<Dropdown defaultValue={searchType} options={searchTypeOptions} onChange={event => setSearchParam(event)} />}
                    labelPosition='left'
                    placeholder='search music'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                /> 
            </form>
        </div>


    )
}

export default Search 