import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Image, Grid, Divider, Header } from 'semantic-ui-react'

import Dropdown from './Components/Dropdown.js'
import TrackBox from './Components/TrackBox.js'
import Track from './Components/Track.js'

const App = () => {
  
  const [token, setToken] = useState('')
  const [genre, setGenre] = useState({ selectedGenre: '', selectedGenreImg: '', listOfGenresFromAPI: [] })
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', selectedPlaylistImg: '', listOfPlaylistFromAPI: [] })
  const [tracks, setTracks] = useState({ selectedTracks: '', listOfTracksFromAPI: []})
  const [showTrack, setShowTrack] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState('')

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)     
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
    .then(tokenResponse => {
      setToken(tokenResponse.data.access_token)
      getGenres(tokenResponse)
    })

  }, [])


  const getGenres = (tokenResponse) => {

    axios('https://api.spotify.com/v1/browse/categories?locale=sv_US',{
        method: 'GET', 
        headers: {
          'Authorization' : 'Bearer ' + tokenResponse.data.access_token 
        },
      })
      .then(getSearchResponse => { 
        setGenre({
          selectedGenre: genre.selectedGenre,
          listOfGenresFromAPI: getSearchResponse.data.categories.items
        })
      })
  }


  const genreChanged = (value) => {
    let genreImg = genre.listOfGenresFromAPI.filter(g => g.id == value )
    

    setGenre({
      selectedGenre: value, 
      selectedGenreImg: genreImg[0].icons[0].url, 
      listOfGenresFromAPI: genre.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${value}/playlists`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(playlistResponse => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    })

  }

  const playlistChanged = (value) => {

    let playlistImg = playlist.listOfPlaylistFromAPI.filter(p => p.id == value)
    setPlaylist({
      selectedPlaylist: value, 
      selectedPlaylistImg: playlistImg[0].images[0].url,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    })


    axios(`https://api.spotify.com/v1/playlists/${value}/tracks?limit=15`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token, 
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTracks: tracks.selectedTracks, 
        listOfTracksFromAPI: tracksResponse.data.items
      })
    })

  }

  const trackBoxClicked = (value) => {

    const track = tracks.listOfTracksFromAPI.filter(t => t.track.id == value)
    setSelectedTrack(track)
    setShowTrack(true)

  }

  const  postFavorite = (album) => {

    fetch('http://localhost:3000/tracks', {
      method: 'POST', 
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      }, 
      body: JSON.stringify({
        track_name: album.name, 
        track_artist: album.albumArtist, 
        track_album: album.name
      })
    })
    .then(response => response.json())      
    .then(console.log)

  }



  return(
    <div> 
      <Container>
        <Grid divided='vertically' style={{ padding: '20px' }}>
          <Grid.Row columns={2} style={{ }}>
            <Grid.Column style={{
              display: 'flex',
              flexDirection:  'column',
              alignItems: 'baseline',
              justifyContent:' space-around',
              height: '770px'
            }}>

              <div>
                <Header size="Huge"> Genre </Header>
                <Image src={genre.selectedGenreImg} size="medium" rounded />
              </div>

              <Dropdown options={genre.listOfGenresFromAPI} selectedValue={ genre.selectedGenre } changed={genreChanged} fluid selection/>
              
              <div> 
              <Header size="Huge"> Playlist </Header>
                <Image src={playlist.selectedPlaylistImg} size="medium" rounded />
              </div>

              <Dropdown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} fluid selection/>
              
            </Grid.Column> 

            <Grid.Column style={{padding: '35px'}}> 
              <TrackBox  items={tracks.listOfTracksFromAPI} clicked={trackBoxClicked} />
            </Grid.Column>

          </Grid.Row>
            <div> 
              { showTrack ? <Track selectedTrack={selectedTrack} postFavorite={postFavorite}/> : null }
            </div>
          <Grid.Row>

          </Grid.Row>

        </Grid> 

      </Container>
    </div>

  )
}

export default App 