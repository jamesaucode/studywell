import React, { Component } from 'react'

export default class Slide extends Component {
  render() {
    return (
      <div className="slide-wrapper">
        <input
        className="slide" 
        type="range" 
        min="0" 
        value={this.props.correct} 
        max={this.props.length}></input>
        <h2 className="slide-text">Correct Answer: {this.props.correct} / {this.props.length} </h2>
      </div>
    )
  }
}
