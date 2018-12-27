import React, { Component } from "react";
import uuid from 'uuid';
import cancel from '../image/error.png'

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
      default:
        break;
    }
  };
  handleSubmit = e => {
    this.props.onSubmit(this.state.questionInput, this.state.answerInput, this.state.id);
  };
  onAddButtonClick = e => {
    console.log(e.keyCode + "DOWN!");
  };
  componentDidMount = () => {
    console.log('Editable new card mounted')
    this.setState({
        questionInput: "Type question here",
        answerInput: "Type answer here"
    })
    // document.addEventListener("keypress", this.handleKeyDown, false);
  };
  
  render() {
    const { style, onCancelClick } = this.props;
    return (
      <div 
      onKeyDown={this.handleKeyDown} 
      tabIndex="0"
      className={style.div + " big-card"}>
        <div className={style.question}>
          <input
            className="big-title"
            value={this.state.questionInput}
            onChange={this.onQuestionInputChange}
            autoFocus
          />
          <button className="btn--dark btn--right" onClick={this.handleSubmit}>
            Add
          </button>
          <button className="btn--top-right" onClick={onCancelClick}>
            <span className="no-background-color">X</span>
          </button>
        </div>
        <input
          className={style.answer}
          value={this.state.answerInput}
          onChange={this.onAnswerInputChange}
        />
      </div>
    );
  }
}
