import React, { Component, MouseEvent } from "react";
import uuid from "uuid";
import cancel from "../image/cross.png";

const initialState = {
  editing: true,
  focused: false,
  questionInput: "",
  answerInput: "",
  uuid: uuid()
};
type State = Readonly<typeof initialState>;
type Props = {
  style: object;
  onSubmit(questionInput: string, answerInput: string, uuid: string): void;
  onCancelClick(e: MouseEvent): void;
};

export default class EditableNewCard extends Component<Props, State> {
  state = initialState;
  componentDidMount = () => {
    console.log("Editable new card mounted");

    // this.questionInput.focus();
    // this.questionInput.select();
  };

  render() {
    const { style, onCancelClick } = this.props;
    const { questionInput, answerInput } = this.state;
    return (
      <div
        onKeyDown={this.handleKeyDown}
        className={style["div"] + " big-card"}
      >
        <div className={style["question"]}>
          <input
            // ref={input => {
            //   this.questionInput = input;
            // }}
            className="big-title"
            value={questionInput}
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
          className={style["answer"]}
          value={answerInput}
          onChange={this.onAnswerInputChange}
          placeholder="Type answer here"
        />
      </div>
    );
  }
  private onQuestionInputChange = e => {
    this.setState({
      questionInput: e.target.value
    });
  };
  private onAnswerInputChange = e => {
    this.setState({
      answerInput: e.target.value
    });
  };
  private handleKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        this.handleSubmit();
        break;
      case 27:
        this.props.onCancelClick(e);
        break;
      default:
        break;
    }
  };
  private handleSubmit = () => {
    this.props.onSubmit(
      this.state.questionInput,
      this.state.answerInput,
      this.state.uuid
    );
  };
  private handleFocus = e => {
    e.target.select();
  };
}
