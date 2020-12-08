import React, { useState } from 'react'
import { Dropdown as SDropdown } from 'semantic-ui-react'

const Dropdown = ( props ) => {

   const dropdownChanged = (event) => {
       props.changed(event.target.value)
   }
    
    return(

        <div>
                <select value={props.selectedValue} onChange={(event) => dropdownChanged(event) }>
                    { props.options.map( (item, index) => <option key={ index } value={ item.id } >{ item.name }</option>   ) }
                </select>
        </div>
    )

}

export default Dropdown