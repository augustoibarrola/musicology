import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from './Components/Dropdown.js'
import TrackBox from './Components/TrackBox.js'

const App = () => {
  
  const [token, setToken] = useState('')
  const [genre, setGenre] = useState({ selectedGenre: '', selectedGenreImg: '', listOfGenresFromAPI: []})
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', selectedPlaylistImg: '', listOfPlaylistFromAPI: [] })
  const [tracks, setTracks] = useState({ selectedTracks: '', listOfTracksFromAPI: []})
  const [showTrack, setShowTrack] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState('')

  const [searchType, setSearchType] = useState('')
  const [searchedResults, setSearchedResults] = useState([])
  const [searchedArtists, setSearchedArtists] = useState([])
  const [searchedAlbums, setSearchedAlbums] = useState([])
  const [selectedSearchedTrack, setSelectedSearchedTrack] = useState([])

  const searchTypeOptions = [
    { key: 'album', text: 'album', value: 'album' },
    { key: 'artist', text: 'artist', value: 'artist' },
  ]

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
          selectedGenre: getSearchResponse.data.categories.items[0].name,
          selectedGenreImg: getSearchResponse.data.categories.items[0].icons[0].url,
          listOfGenresFromAPI: getSearchResponse.data.categories.items
        })
        axios(`https://api.spotify.com/v1/browse/categories/${getSearchResponse.data.categories.items[0].id}/playlists`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        })
        .then(playlistResponse => {
          setPlaylist({
            selectedPlaylist: playlistResponse.data.playlists.items[0].name,
            selectedPlaylistImg: playlistResponse.data.playlists.items[0].images[0].url,
            listOfPlaylistFromAPI: playlistResponse.data.playlists.items
          })
          axios(`https:api.spotify.com/v1/playlists/${playlistResponse.data.playlists.items[0].id}/tracks?limit=15`, {
            method: 'GET',
            headers: {
              'Authorization' : 'Bearer ' + tokenResponse.data.access_token, 
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

  return(
    <div className="main-container"> 
      <div className="main-container-rows">
        <div>
          <h1> Genre </h1>
          { genre ?  <img className="album-cover" src={genre.selectedGenreImg} /> : null }
          <Dropdown options={genre.listOfGenresFromAPI} selectedValue={ genre.selectedGenre } changed={genreChanged} selectedGenreImg={genre.selectedGenreImg} selection/>
        </div>
        
        <div> 
          <h1> Playlist </h1>
          <img className="album-cover" src={playlist.selectedPlaylistImg}/>
          <Dropdown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} selectedGenreImg={playlist.selectedPlaylistImg} changed={playlistChanged}  selection/>        
        </div>

      </div>

      <div className="main-container-rows">
        <TrackBox  items={tracks.listOfTracksFromAPI} clicked={trackBoxClicked} selectedTrack={selectedTrack}/>
      </div>

    </div>
  )
}

export default App 