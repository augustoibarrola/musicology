import React, {useState, useEffect} from 'react'
import { Icon, Grid } from 'semantic-ui-react'
import { ColorExtractor } from 'react-color-extractor'

const Track = ({ selectedTrack, postFavorite }) => {

    const [album, setAlbum] = useState({
        name: selectedTrack[0].track.album.name,
        albumArtist: selectedTrack[0].track.artists[0].name, 
        image: selectedTrack[0].track.album.images[0].url,
        albumId: selectedTrack[0].track.album.id,
        releaseDate: selectedTrack[0].track.album.release_date
    })

    const [albumColors, setAlbumColors] = useState([])


    useEffect(() => {
        setAlbum({
        name: selectedTrack[0].track.album.name, 
        albumArtist: selectedTrack[0].track.artists[0].name, 
        image: selectedTrack[0].track.album.images[0].url,
        albumId: selectedTrack[0].track.album.id,
        releaseDate: selectedTrack[0].track.album.release_date
        })
    }, [selectedTrack])

    const image = album.image

    const renderColors = () => {
        const colors = albumColors 

        return colors.map( ( color, id ) => {
        return  <div key={id} style={{backgroundColor: color, width: '100px', height: '100px'}}></div> 
        } )
    }

    const getColors = colors => {
        setAlbumColors(colors)
    }


    return( 
        <div>
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <img className="img" src={album.image}  style={{ maxHeight:'auto', maxWidth: '350px' }} ></img>
                        <div>
                            <h2>{album.name}</h2>
                            <h3> by <em>{album.albumArtist}</em> </h3>
                        </div>
                        <Icon name="heart" onClick={() => postFavorite(album)}></Icon>
                    </Grid.Column>

                    <Grid.Column>
                        <div> 
                            <ColorExtractor getColors={colors => {getColors(colors)}} src={album.image} />
                            <div style={ { marginTop: '20px', display: 'flex', justifyContent: 'center' } }>
                                {renderColors()}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Track