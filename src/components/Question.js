import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Question extends Component {
  render() {
    const { i, question, answer } = this.props;
    return (
      <div className="small-title">
        <p className="tiny-title">
          {i}. {question}
        </p>
        <p className="tiny-text">Ans: {answer}</p>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string
};
