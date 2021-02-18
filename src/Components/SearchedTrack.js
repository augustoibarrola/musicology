import React, {useState, useEffect} from 'react'
import { Icon, Grid, Header } from 'semantic-ui-react'
import { ColorExtractor } from 'react-color-extractor'

const SearchedTrack = ({selectedTrack, postFavorite}) => {


    console.log(selectedTrack)
    console.log(postFavorite)

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

    const renderColors = () => {
        const colors = albumColors 

        return colors.map( ( color, id ) => {
            // console.log(color)
            // console.log(id)
        return  <div key={id} style={{backgroundColor: color, width: '100px', height: '100px'}}></div> 
        } )
    }

    const getColors = colors => {
        setAlbumColors(colors)
    }



    return( 
        <div>
            <Grid divided='vertically' style={{ width: '130%' }} >

                <Grid.Row columns={2} style={{display: 'flex', flexDirection: 'row-reverse', paddingTop: '40px'}}>

                    <Grid.Column style={{paddingLeft: '93px'}}>

                        <img className="img" src={album.image}  style={{ maxHeight:'275px', maxWidth: '275px' }} ></img>

                    </Grid.Column>

                    <Grid.Column >
                        <div>
                            <Header size="large">{album.name}</Header>
                            <Header size="medium"> by <em>{album.albumArtist}</em> </Header>
                            <Icon name="heart" onClick={() => postFavorite(album)}></Icon>
                        </div>

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

export default SearchedTrack