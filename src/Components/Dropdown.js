import React, { useState } from 'react'

const Dropdown =  ( props ) => {

    const dropdownChanged = (event) => {
       props.changed(event.target.value)
    }
    
    return(

        <div className="dropdown-selector">
                <select value={props.selectedValue} onChange={(event) => dropdownChanged(event) }>
                    { props.options.map( (item, index) => <option key={ index } value={ item.id } >{ item.name }</option>   ) }
                </select>
        </div>
    )

}

export default Dropdown