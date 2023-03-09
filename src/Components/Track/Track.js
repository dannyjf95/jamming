import React from "react";
import './Track.css'


export class Track extends React.Component { //displays button, track name/artist/album 
  constructor(props) {
    super(props)

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

  addTrack() {// onAdd passed from App >SearchResults >TrackList >Track*
    this.props.onAdd(this.props.track)
  }
  removeTrack() {
    this.props.onRemove(this.props.track)
  }

  renderAction () {//was stuck how it was a prop until i read the step fully(if the isRemoval property)    

    return this.props.isRemoval
    ? <button className="Track-action" onClick={this.removeTrack}>-</button>
    : <button className="Track-action" onClick={this.addTrack}>+</button>
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p> {this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
