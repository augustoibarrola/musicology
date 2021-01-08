import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import Track from './Track.js'
import TrackThumbnail from './TrackThumbnail.js'
import SearchedTrack from './SearchedTrack.js'

const SearchedResults = ( props ) => {
    console.log(props)
    
    const [showTrack, setShowTrack] = useState(false)

     if(!props.items == []) {
         for(const item of props.items) {
            if (item.images[1].url === undefined ){
                props.items.splice(props.item.index, 1)
            } 
         }
     }

     const clicked = (event) => {
         console.log(event.target.id)
        event.preventDefault()
        props.clicked(event.target.name)
        setShowTrack(true)
    }
    
    return(

        <div>
            <div> 
                <Image.Group style={{ width: '900px' }}>
                    {
                        props.items.map((item, index) => {
                            if ( item.images[1].url !== []) {
                                return <TrackThumbnail index={ index } key={ item.id } id={ item.id } name={item.name} clicked={ clicked } image={item.images[1].url} />
                            } 
                        })
                    }
                </Image.Group>  
            </div>

            {showTrack ? <SearchedTrack selectedTrack={props.selectedTrack} postFavorite={props.postFavorite}/> : null } 

        </div>

    )

}

export default SearchedResults