import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Slide extends Component {
  render() {
    return (
      <div className="slide-wrapper">
        <input
          className="slide"
          type="range"
          min="0"
          value={this.props.correct}
          max={this.props.length}
        />
        <h2 className="slide-text">
          Correct Answer: {this.props.correct} / {this.props.length}{" "}
        </h2>
      </div>
    );
  }
}

Slide.propTypes = {
  correct: PropTypes.bool,
  length: PropTypes.number
};
