import React, { useState, useEffect } from 'react'

const ListBox = (props) => {
    console.log("props at listbox => ", props )
    console.log("items at listbox => ", props.items)
    
    const clicked = (event) => {
        event.preventDefault()
        props.clicked(event.target.id)
    }

    return(
        <div> 
            {
                props.items.map((item, index) => {
                    return <button key={ index } id={ item.track.id } onClick={ clicked }  > {item.track.name}</button>
                })
            }
        </div>
    )

}

export default ListBox