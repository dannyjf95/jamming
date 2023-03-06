import React from "react";
import "./App.css";

import { SearchBar } from "../../SearchBar/SearchBar";
import { SearchResults } from "../../SearchResults/SearchResults";
import { Playlist } from "../../Playlist/Playlist";
// import { Track } from "../../Track/Track";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: "Wonderwall", artist: "Oasis", album: "(What's The Story) Morning Glory?", id: 1 },
        { name: "name2", artist: "artist2", album: "album2", id: 2 },
        { name: "name3", artist: "artist3", album: "album3", id: 3 },
      ],

      playlistTracks: [
        { name: "playlistName1", artist: "playlistArtist1", album: "playlistAlbum1", id: 4 },
        { name: "playlistName2", artist: "playlistArtist1", album: "playlistAlbum2", id: 5 },
        { name: "playlistName3", artist: "playlistArtist1", album: "playlistAlbum3", id: 6 },
      ],

      playlistName: "Playlist filler",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack =  this.removeTrack.bind(this)
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
    tracks = tracks.filter(curr => curr.id !== track.id) //

    this.setState({ playlistTracks: tracks })
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/*  */}
          <SearchBar />
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
            />
          </div>
        </div>
      </div>
    );
  }
}
