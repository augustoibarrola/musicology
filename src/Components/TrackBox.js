import React, { useState, useEffect } from 'react'
import Track from './Track.js'

const TrackBox = (props) => {

    const clicked = (event) => {
        event.preventDefault()
        props.clicked(event.target.id)
    }

    return(
        <div> 
            {
                props.items.map((item, index) => {
                    return <button key={ index } id={ item.track.id } onClick={ clicked } > {item.track.name}</button>
                })
            }
        </div>
    )

}

export default TrackBox