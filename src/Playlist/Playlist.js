import React from "react";
import "./Playlist.css";

import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    //targets the input from the onChange render // PLAY AROUND
    const event = e.target.value;
    this.props.onNameChange(event);
  }

  render() {
    let isRemoval = true;
    return (
      <div className="Playlist">
        <input /** events target*/
          defaultValue={"New Playlist"}
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={isRemoval}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
