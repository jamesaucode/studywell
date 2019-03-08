import React, { Component } from "react";
import uuid from "uuid";
import cancel from "../image/cross.png";
import PropTypes from "prop-types";

export default class EditableNewCard extends Component {
  state = {
    editing: true,
    focused: false,
    questionInput: "",
    answerInput: "",
    id: uuid()
  };
  onQuestionInputChange = e => {
    this.setState({
      questionInput: e.target.value
    });
  };
  onAnswerInputChange = e => {
    this.setState({
      answerInput: e.target.value
    });
  };
  handleKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        this.handleSubmit(e);
        break;
      case 27:
        this.props.onCancelClick();
        break;
      default:
        break;
    }
  };
  handleSubmit = e => {
    this.props.onSubmit(
      this.state.questionInput,
      this.state.answerInput,
      this.state.id
    );
  };
  handleFocus = e => {
    e.target.select();
  };
  componentDidMount = () => {
    console.log("Editable new card mounted");

    this.questionInput.focus();
    this.questionInput.select();
  };

  render() {
    const { style, onCancelClick } = this.props;
    return (
      <div
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
        className={style.div + " big-card"}
      >
        <div className={style.question}>
          <input
            ref={input => {
              this.questionInput = input;
            }}
            className="big-title"
            value={this.state.questionInput}
            onChange={this.onQuestionInputChange}
            onFocus={this.handleFocus}
            placeholder="Type question here"
          />
          <button
            className="btn--dark btn--right tiny-gutter-right"
            onClick={this.handleSubmit}
          >
            Add
          </button>
          <button className="btn--top-right" onClick={onCancelClick}>
            <img alt="cancel button" className="testing" src={cancel} />
          </button>
        </div>
        <input
          className={style.answer}
          value={this.state.answerInput}
          onChange={this.onAnswerInputChange}
          placeholder="Type answer here"
        />
      </div>
    );
  }
}

EditableNewCard.propTypes = {
  style: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancelClick: PropTypes.func
};
