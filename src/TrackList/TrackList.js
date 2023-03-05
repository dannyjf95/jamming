import React from "react";
import './TrackList.css'


export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
          <p>Track 1</p>
          <p>Track 2</p>
          <p>Track 3</p>
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
      </div>
    );
  }
}
