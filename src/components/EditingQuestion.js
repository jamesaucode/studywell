import React, { Component } from "react";

export default class EditingQuestion extends Component {
  state = {
    card: {
      question: this.props.question,
      answer: this.props.answer,
      id: this.props.id
    },
    i: this.props.i,
    questionInput: "",
    answerInput: "",
    iInput: "",
    focused: false
  };
  onQuestionInputChange = e => {
    this.setState({
      card: {
        question: e.target.value,
        answer: this.props.answer,
        id: this.props.id
      }
    });
  };
  onAnswerInputChange = e => {
    this.setState({
      card: {
        question: this.props.question,
        answer: e.target.value,
        id: this.props.id
      }
    });
  };
  onBlur = e => {
    console.log(this.state);
    this.setState({
      focused: false
    });
  };
  onFocus = e => {
    this.setState({
      focused: true
    });
  };
  handleEditClick = () => {
    this.props.onEditSubmit(this.state.card);
    this.onBlur();
  };

  render() {
    const { question, answer, i } = this.state.card;
    return (
      <div className="small-title">
        <div className="small-title">
          <input
            onFocus={this.onFocus}
            onBlur={this.handleEditClick}
            value={question}
            onChange={this.onQuestionInputChange}
            className="tiny-title"
          />
          <textarea
            onFocus={this.onFocus}
            onBlur={this.handleEditClick}
            value={answer}
            onChange={this.onAnswerInputChange}
            // className="tiny-text"
            name="text"
          />
        </div>
      </div>
    );
  }
}
