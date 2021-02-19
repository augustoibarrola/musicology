import React, {useState, useEffect} from 'react'
import { ColorExtractor } from 'react-color-extractor'

const Track = ({ selectedTrack, postFavorite }) => {

    const [albumColors, setAlbumColors] = useState([])
    const [album, setAlbum] = useState({})

    useEffect(() => {
        setAlbum({
        name: selectedTrack[0].track.album.name, 
        albumArtist: selectedTrack[0].track.artists[0].name, 
        image: selectedTrack[0].track.album.images[0].url,
        albumId: selectedTrack[0].track.album.id,
        releaseDate: selectedTrack[0].track.album.release_date
        })
    }, [selectedTrack])

    const renderColors = () => {
        const colors = albumColors 

        return colors.map( ( color, id ) => {
        return  <div key={id} style={{backgroundColor: color, width: '100', height: '100'}}></div> 
        } )
    }

    const getColors = colors => {
        setAlbumColors(colors)
    }


    return( 
        <div className="track-color-container">

            <img className="album-cover" src={album.image}/>

            <div>
                <h1>{album.name}</h1>
                <h2> by <em>{album.albumArtist}</em> </h2>
            </div>

            <div> 
                <ColorExtractor getColors={colors => {getColors(colors)}} src={album.image} maxColors={10}/>
                <div style={ { marginTop: '20px', display: 'flex', justifyContent: 'center' } }>
                    {renderColors()}
                </div>
            </div>   

        </div>
    )
}

export default Track