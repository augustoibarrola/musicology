import React, {useState, useEffect} from 'react'

const Track = ({ selectedTrack }) => {
    console.log(selectedTrack[0].track)

    const [album, setAlbum] = useState({
        name: selectedTrack[0].track.album.name, 
        image: selectedTrack[0].track.album.images[0].url,
        albumId: selectedTrack[0].track.album.id,
        releaseDate: selectedTrack[0].track.album.release_date
    })

    useEffect(() => {
        setAlbum({
        name: selectedTrack[0].track.album.name, 
        image: selectedTrack[0].track.album.images[0].url,
        albumId: selectedTrack[0].track.album.id,
        releaseDate: selectedTrack[0].track.album.release_date
        })
    }, [selectedTrack])

    return( 
        <div>
            <img src={album.image}></img>
            <h2>{album.name}</h2>
        </div>
    )
}

export default Track