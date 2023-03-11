import React from "react";
import "./PlaylistListItem.css";

export class PlaylistListItem extends React.Component {
  constructor(props) {
    super(props);

    this.selectList = this.selectList.bind(this);
  }

  selectList() {
    this.props.selectPlaylist(this.props.playlistName);
  }

  render() {
    // all have an onClick
    return (
      <div className="playlistListItem" onClick={this.selectList}>
        <h3 playlist={this.props.playlistName} onClick={this.selectList}>
          {this.props.playlistName}
        </h3>
      </div>
    );
  }
}
//CHECKED
