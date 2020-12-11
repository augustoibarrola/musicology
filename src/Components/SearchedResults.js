import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import Track from './Track.js'

import TrackThumbnail from './TrackThumbnail.js'

function SearchedResults ( props ) {
    console.log(props)



    // const clicked = (event) => {
    // event.preventDefault()
    // props.clicked(event.target.id)
    // }
    
  return(

    <div>
        <div> 
            <Image.Group style={{ width: '900px' }}>
                {
                    // items.map((item, index) => {
                    //     return <TrackThumbnail index={ index } key={ item.id } id={ item.id } name={item.name} image={item.images[1].url} />
                    // })
                }
            </Image.Group>  
        </div>

        {/* {props.selectedTrack ? <Track selectedTrack={props.selectedTrack} postFavorite={props.postFavorite}/> : null } */}

    </div>

    )

}

export default SearchedResults