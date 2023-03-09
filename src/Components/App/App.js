import React from "react";
import "./App.css";

import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
// import { Track } from "../../Track/Track";
import { Spotify } from "../../util/Spotify";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],

      playlistTracks: [],

      playlistName: "Playlist filler",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  //end of constructor

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

  savePlaylist() {
    //In a later section, you will hook the .search() method up to the Spotify API.
    //creates new arr via .mpa()

    let trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      //after it  is saved // i w as lost on this  part 70%
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(term) {
    //In a later assessment, we will hook this method up to the Spotify API.
    Spotify.search(term).then((searchResults) => {
      //updating searchResults state from jsonResponse
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
        </div>
      </div>
    );
  }
}
