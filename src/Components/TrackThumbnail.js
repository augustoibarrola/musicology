import React, { useState, useEffect } from 'react'

const TrackThumbnail = ({index, id, name, clicked, image}) => {
    return(
        <div className="track-thumbnails-container">
            <img className="album-thumbnails" src={image} index={index} id={id} name={name} onClick={event => { clicked( event ) } }/>
        </div>
    )
}   

export default TrackThumbnail