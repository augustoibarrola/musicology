import React, {useState, useEffect} from 'react'

const Track = ({ selectedTrack }) => {
    console.log("SELECTED TRACK => ", selectedTrack)
    console.log(selectedTrack[0].track.album.images[0])
    return( 
        <div>
            <img src={selectedTrack[0].track.album.images[0].url}></img>
        </div>
    )


}

export default Track