import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import Track from './Track.js'
import TrackThumbnail from './TrackThumbnail.js'
import SearchedTrack from './SearchedTrack.js'

const SearchedResults = ( { items, clicked, selectedTrack, postFavorite } ) => {
    // console.log(items, clicked, selectedTrack, postFavorite)

    
    return(

        <div>
            <div> 
                <Image.Group style={{ width: '900px' }}>
                    {
                        items.map((item, index) => {
                            if ( item.images[1].url !== []) {
                                return <TrackThumbnail index={ index } key={ item.id } id={ item.id } name={item.name} clicked={ clicked } image={item.images[1].url} />
                            } 
                        })
                    }
                </Image.Group>  
            </div>


        </div>

    )

}

export default SearchedResults