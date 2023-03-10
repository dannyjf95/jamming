//react import section
import React from "react";

//file import section
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import { PlaylistList } from "../PlaylistList/PlaylistList";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],

      playlistTracks: [],

      playlistName: "Playlist filler",

      playlistList: [],

      playlistId: null,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
  } //end constructor

  async componentDidMount() {
    try {
      const playlistList = await Spotify.getUserPlaylists();
      this.setState({ playlistList });
    } catch (error) {
      console.log(error);
    }
  }

  async selectPlaylist(id) {
    try {
      const plistID = await Spotify.getPlaylist(id);
      this.setState({
        playlistName: plistID.name,
        playlistTracks: plistID.tracks,
        playlistId: plistID.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);

    try {
      await Spotify.savePlaylist(
        this.state.playlistName,
        trackUris,
        this.state.playlistId,
      );

      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
        playlistId: null,
      });
    } catch (error) {
      console.log(error);
    }
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks; // to avoid directly mod the state

    /* comparing id of searched track and playlist track
    .push()state.playlistTracks if no matching id(new song)*/
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((curr) => curr.id !== track.id); //

    this.setState({ playlistTracks: tracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  search(term) {
    //updating searchResults state from jsonResponse
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/*  */}
          <SearchBar onSearch={this.search} />
          {/*  */}
          <div className="App-playlist">
            {/*  */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            {/*  */}
            <Playlist
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
          <PlaylistList
            playlistList={this.state.playlistList}
            selectPlaylist={this.selectPlaylist}
          />
        </div>
      </div>
    );
  }
}
