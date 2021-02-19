import React, { useState, useEffect } from 'react'
import Track from './Track.js'
import TrackThumbnail from './TrackThumbnail.js'

const TrackBox = (props) => {

    const clicked = (event) => {
    event.preventDefault()
    props.clicked(event.target.id)
    }
    
  return(

    <div className="track-container-main">
        <div className="track-container-row"> 
            <div className="thumbnails-container-grid">
                {            
                    props.items.map((item, index) => {
                    return <TrackThumbnail index={ index } key={ item.track.id } id={ item.track.id } name={item.track.name} clicked={ clicked } image={item.track.album.images[1].url} />
                    })
                }
            </div>
        </div>

        <div className="track-container-row">
            {props.selectedTrack ? <Track selectedTrack={props.selectedTrack} /> : null }
        </div>

    </div>

    )

}

export default TrackBox