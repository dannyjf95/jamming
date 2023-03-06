import React from "react";
import './Playlist.css'

import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  render() {
    let isRemoval = true;
    return (
      <div className="Playlist">
        <input value={"New Playlist"} />
        <TrackList 
          tracks={this.props.playlistTracks}
            onRemove={this.props.onRemove}
              isRemoval={isRemoval}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
