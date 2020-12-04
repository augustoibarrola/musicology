import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'

import TrackThumbnail from './TrackThumbnail.js'

const TrackBox = (props) => {

    const clicked = (event) => {
    event.preventDefault()
    props.clicked(event.target.id)
    }
    
  console.log(props)

    return(
        <div>
            <Image.Group style={{ width: '900px' }}>
                {
                    props.items.map((item, index) => {
                        return <TrackThumbnail index={ index } id={ item.track.id } name={item.track.name} clicked={ clicked } image={item.track.album.images[1].url}/ >
                    })
                }
            </Image.Group>  
        </div>
    )

}

export default TrackBox