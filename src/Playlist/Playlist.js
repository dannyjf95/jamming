import React from "React";
import './Playlist.css'

import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input value="New Playlist" />
        {/* <TrackList/> */}
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
