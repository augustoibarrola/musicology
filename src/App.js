import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Image, Grid, Divider, Header } from 'semantic-ui-react'

import Dropdown from './Components/Dropdown.js'
import TrackBox from './Components/TrackBox.js'
import Track from './Components/Track.js'
import Search from './Components/Search.js'

const App = () => {
  
  const [token, setToken] = useState('')
  const [genre, setGenre] = useState({ selectedGenre: '', selectedGenreImg: '', listOfGenresFromAPI: []})
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', selectedPlaylistImg: '', listOfPlaylistFromAPI: [] })
  const [tracks, setTracks] = useState({ selectedTracks: '', listOfTracksFromAPI: []})
  const [showTrack, setShowTrack] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState('')

  const searchTypeOptions = [
    { key: 'album', text: 'album', value: 'album' },
    { key: 'artist', text: 'artist', value: 'artist' },
    { key: 'playlists', text: 'playlists', value: 'playlists' },
  ]

  // upon initiation of application (and only on initial initialization)
  // fetch request is made to Spotify to retrieve a token which is then placed in the 
  // 'token' variable – 
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

      // (1/2) –  immediately after the token is set inside of 'token', another 
      // fetch request is fired which utilizes 'token' and retrieves a set of playlists.
      // 'genre' is then set to the return value of the second fetch request 
      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US',{
        method: 'GET', 
        headers: {
          'Authorization' : 'Bearer ' + tokenResponse.data.access_token 
        },
      })
      .then(getSearchResponse => { 
        setGenre({
          selectedGenre: getSearchResponse.data.categories.items[0].name,
          selectedGenreImg: getSearchResponse.data.categories.items[0].icons[0].url,
          listOfGenresFromAPI: getSearchResponse.data.categories.items
        })
        axios(`https://api.spotify.com/v1/browse/categories/${getSearchResponse.data.categories.items[0].id}/playlists`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        })
        .then(playlistResponse => {
          console.log(playlistResponse)
          setPlaylist({
            selectedPlaylist: playlistResponse.data.playlists.items[0].name,
            selectedPlaylistImg: playlistResponse.data.playlists.items[0].images[0].url,
            listOfPlaylistFromAPI: playlistResponse.data.playlists.items
          })

          console.log(playlistResponse.data.playlists.items[0].id)

           axios(`https:api.spotify.com/v1/playlists/${playlistResponse.data.playlists.items[0].id}/tracks?limit=15`, {
             method: 'GET',
             headers: {
               'Authorization' : 'Bearer ' + tokenResponse.data.access_token, 
               'Content-Type' : 'application/json',
               'Accept' : 'application/json'
             }
           })
           .then(tracksResponse => {
             console.log(tracksResponse)
              setTracks({
                selectedTracks: tracks.selectedTracks, 
                listOfTracksFromAPI: tracksResponse.data.items
              })
           })
          
        })
      })
    })
  }, [])

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
        selectedPlaylist: playlistResponse.data.playlists.items[0].name,
        selectedPlaylistImg: playlistResponse.data.playlists.items[0].images[0].url,
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

  const postFavorite = (album) => {

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

  const spotifySearch = (event, value, searchType) => {
    event.preventDefault()

  }




  return(
    <div> 
      <Container>
        <Grid divided='vertically' style={{ padding: '20px', minWidth: 'max-content' }}>
          <Search searchTypeOptions={searchTypeOptions} spotifySearch={spotifySearch} />
          <Grid.Row columns={2} style={{ }}>
            
            <Grid.Column style={{
              display: 'flex',
              flexDirection:  'column',
              alignItems: 'baseline',
              justifyContent:' space-around',
              height: '770px',
              maxWidth: '400px'
              }}>

              <div>
                <Header size="Huge"> Genre </Header>
                { genre ?  <Image src={genre.selectedGenreImg} size="medium" rounded /> : null }
              </div>

              <Dropdown options={genre.listOfGenresFromAPI} selectedValue={ genre.selectedGenre } changed={genreChanged} selectedGenreImg={genre.selectedGenreImg} selection/>
              
              <div> 
                <Header size="Huge"> Playlist </Header>
                <Image src={playlist.selectedPlaylistImg} size="medium" rounded />
              </div>

              <Dropdown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} selectedGenreImg={playlist.selectedPlaylistImg} changed={playlistChanged}  selection/>
              
            </Grid.Column> 

            <Grid.Column style={{padding: '35px', paddingLeft: '95px'}}> 

              <TrackBox  items={tracks.listOfTracksFromAPI} clicked={trackBoxClicked} selectedTrack={selectedTrack} postFavorite={postFavorite}/>
            
            </Grid.Column>

          </Grid.Row>

        </Grid> 

      </Container>
    </div>

  )
}

export default App 