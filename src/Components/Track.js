import React, {useState, useEffect} from 'react'

const Track = ({ selectedTrack }) => {

    const [album, setAlbum] = useState({
        name: selectedTrack[0].track.album.name,
        albumArtist: selectedTrack[0].track.artists[0].name, 
        image: selectedTrack[0].track.album.images[0].url,
        albumId: selectedTrack[0].track.album.id,
        releaseDate: selectedTrack[0].track.album.release_date
    })

    useEffect(() => {
        setAlbum({
        name: selectedTrack[0].track.album.name, 
        albumArtist: selectedTrack[0].track.artists[0].name, 
        image: selectedTrack[0].track.album.images[0].url,
        albumId: selectedTrack[0].track.album.id,
        releaseDate: selectedTrack[0].track.album.release_date
        })
    }, [selectedTrack])

    return( 
        <div>
            <img className="img" src={album.image}  style={{ maxHeight:'auto', maxWidth: '350px' }} ></img>
            <div>
                <h2>{album.name}</h2>
                <h3> by <bold>{album.albumArtist}</bold> </h3>
            </div>
        </div>
    )
}

export default Track