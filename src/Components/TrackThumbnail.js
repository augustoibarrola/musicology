import React, { useState, useEffect } from 'react'

const TrackThumbnail = ({index, id, name, clicked, image}) => {
    return(
        <div className="album-thumbnail-container">
            <img className="album-thumbnail" src={image} index={index} id={id} name={name} onClick={event => { clicked( event ) } }/>
        </div>
    )
}   

export default TrackThumbnail