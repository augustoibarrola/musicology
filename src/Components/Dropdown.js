import React, { useState } from 'react'

const Dropdown = ( props ) => {

   const dropdownChanged = (event) => {
       props.changed(event.target.value)
   }
    
    return(

        <div>

                <select value={props.selectedValue} onChange={ dropdownChanged }>
                    { props.options.map( (item, index) => <option key={ index } value={ item.value } >{ item.name }</option>   ) }
                </select>
                <p> { selectedValue } </p>

        </div>
    )

}

export default Dropdown