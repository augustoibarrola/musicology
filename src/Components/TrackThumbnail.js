import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'

const TrackThumbnail = ({index, id, name, clicked, image}) => {
    return(
        <Image src={image} index={index} id={id} name={name} size='small' rounded onClick={event => { clicked(event) } }></Image>
    )
}   

export default TrackThumbnail