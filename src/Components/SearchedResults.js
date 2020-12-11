import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import Track from './Track.js'

import TrackThumbnail from './TrackThumbnail.js'

function SearchedResults ( props ) {
    // console.log(props.items)
    

     if(!props.items == []) {
          console.log(props.items)
         for(const item of props.items) {
            if (item.images[1].url == undefined ){
                props.items.splice(props.item.index, 1)
            } 
         }
     }

     console.log(props.item)

    // const clicked = (event) => {
    // event.preventDefault()
    // props.clicked(event.target.id)
    // }
    
  return(

    <div>
        <div> 
            <Image.Group style={{ width: '900px' }}>
                {
                     props.items.map((item, index) => {
                         if ( item.images[1].url !== []) {
                             return <TrackThumbnail index={ index } key={ item.id } id={ item.id } name={item.name} image={item.images[1].url} />
                         } 
                     })
                }
            </Image.Group>  
        </div>

        {/* {props.selectedTrack ? <Track selectedTrack={props.selectedTrack} postFavorite={props.postFavorite}/> : null } */}

    </div>

    )

}

export default SearchedResults