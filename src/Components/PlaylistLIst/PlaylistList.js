import React from "react";
import "./PlaylistList.css";
import { PlaylistListItem } from "../PlaylistListItem/PlaylistListItem";

export class PlaylistList extends React.Component {
  render() {
    return (
      <div className="playlistList">
        <h2>Your Current playlists</h2>
        {this.props.playlistList.map((playlist) => {
          return (
            <PlaylistListItem
              playlistName={playlist.playlistName}
              key={playlist.playlistId} // id props passed down to be rendered
              selectPlaylist={this.props.selectPlaylist}
            />
          );
        })}
      </div>
    );
  }
}
