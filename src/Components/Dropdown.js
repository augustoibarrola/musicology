import React, { useState } from 'react'

const Dropdown = ({ data }) => {

    const [selectedValue, setSelectedValue] = useState('')
    

    return(

        <div>

                <select value={selectedValue} onChange={event => setSelectedValue(event.target.value)}>
                    { data.map( (item, index) => <option key={ index } value={ item.value } >{ item.name }</option>   ) }
                </select>
                <p> { selectedValue } </p>

        </div>
    )

}

export default Dropdown