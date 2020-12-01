import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from './Components/Dropdown.js'
import ListBox from './Components/ListBox.js'
import Track from './Components/Track.js'

const App = () => {

  const [token, setToken] = useState('')
  const [genre, setGenre] = useState({ selectedGenre: '', listOfGenresFromAPI: [] })
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] })
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

    })
  }, [ genre.selectedGenre, process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET ])

  const genreChanged = (value) => {

    setGenre({
      selectedGenre: value, 
      listOfGenresFromAPI: genre.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${value}/playlists`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(playlistResponse => {
      console.log(playlistResponse)
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    })

  }

  const playlistChanged = (value) => {
    console.log(`PLAYLIST ID SET TO ${value}`)
    setPlaylist({
      selectedPlaylist: value, 
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    })
  }

  const buttonClicked = (event) => {
    console.log(tracks)
    event.preventDefault()

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=15`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token, 
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
    .then(tracksResponse => {
      console.log("GET REQUEST FOR TRACKS => ", tracksResponse)
      setTracks({
        selectedTracks: tracks.selectedTracks, 
        listOfTracksFromAPI: tracksResponse.data.items
      })
      console.log(tracks)

    })
  }

  const listboxClicked = (value) => {
    console.log("TRACK ID => ", value)
    console.log("TRACKS => ", tracks.listOfTracksFromAPI)

    const track = tracks.listOfTracksFromAPI.filter(t => t.track.id == value)
    console.log(track)
    setSelectedTrack(track)
    setShowTrack(true)

  }
  
  return(
    <div> 
      <form onSubmit={ buttonClicked }> 
        Genres:
        <Dropdown options={genre.listOfGenresFromAPI} selectedValue={ genre.selectedGenre } changed={genreChanged}/>
        Genre's Playlists
        <Dropdown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged}/>
        <button type="submit" >
          Search for Tracks
        </button>
      </form>
      <ListBox  items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
      <div>
        { showTrack ? <Track selectedTrack={selectedTrack} /> : null }
      </div>
    </div>

  )
}

export default App 