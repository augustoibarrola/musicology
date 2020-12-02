import React, { useState, useEffect } from 'react'
import TrackThumbnail from './TrackThumbnail.js'

const TrackBox = (props) => {

    const clicked = (event) => {
    console.log("CLICKED SUCCESS ")
    event.preventDefault()
    props.clicked(event.target.id)
}
  

    return(
        <div> 
                {
                    props.items.map((item, index) => {
                        return <TrackThumbnail index={ index } id={ item.track.id } name={item.track.name} clicked={ clicked } image={item.track.album.images[1].url}/ >
                    })
                }
        </div>
    )

}

export default TrackBox