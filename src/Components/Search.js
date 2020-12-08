import React, { useState, useEffect } from 'react'
import { Input, Dropdown } from 'semantic-ui-react'

const Search = ({ searchTypeOptions, spotifySearch }) => {

    const [searchType, setSearchType] = useState(searchTypeOptions[0]["value"])
    const [placeholder, setPlaceholder] = useState('search music')

    const setSearchParam = (event) => {
        setPlaceholder('search music')
        setSearchType(event.target.value)
    }

    return(
        <div>
            <form onSubmit={ event => spotifySearch(event) } > 
                <Input 
                    as="submit"
                    label={<Dropdown defaultValue={searchType} options={searchTypeOptions} onChange={event => setSearchParam(event)} />}
                    labelPosition='left'
                    placeholder={placeholder}
                /> 
            </form>
        </div>


    )
}

export default Search 