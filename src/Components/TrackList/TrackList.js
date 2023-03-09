import React from "react";
import "./TrackList.css";

import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  //track info = track in this.props.tracks
  render() {
    return (
      <div className="TrackList">
        {
          //maps new arr(track) with passing track={track} att/prop and key=state.id
          this.props.tracks.map((track) => (
            <Track
              onAdd={this.props.onAdd}
              track={track}
              key={track.id}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          ))
        }
      </div>
    );
  }
}
