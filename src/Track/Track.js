import React from "react";
import './Track.css'


export class Track extends React.Component {

  renderAction () {//was stuck how it was a prop until i read the step fully(if the isRemoval property)
    

    this.props.isRemoval
    ? <button className="Track-action">-</button>
    : <button className="Track-action">+</button>
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>track name will go here</h3>
          <p> track artist will go here | track album will go here </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
