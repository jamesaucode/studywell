import React, { Component, MouseEvent } from "react";
import checked from "../image/checked.png";
import cross from "../image/cross.png";

"use strict";

const SPACEKEY = 32;
const initialState = {
  showAnswer: false,
  correct: []
};
type State = { showAnswer: boolean; correct: boolean[] };
type Props = {
  question: string;
  answer: string;
  currentQuestionNumber: number;
  style: object;
  testingMode: boolean;
  onTestModeClickTrue(e: MouseEvent): void;
  onTestModeClickFalse(e: MouseEvent): void;
  onCorrectAnswerClick(e: MouseEvent): void;
  onNextQuestionClick(e: MouseEvent): void;
  length: number;
};

export default class CurrentCard extends Component<Props, State> {
  readonly state: State = initialState;
  componentDidMount = () => {
    const initializeCorrect: boolean[] = [];
    this.setState({
      correct: initializeCorrect
    });
  };
  render() {
    const {
      question,
      answer,
      style,
      currentQuestionNumber,
      testingMode
    } = this.props;
    const { correct } = this.state;
    const { handleTestModeClickSetFalse, handleTestModeClickSetTrue } = this;
    let leftBtn = "";
    let rightBtn = "";
    if (!testingMode) {
      leftBtn = "tab clicked";
    } else {
      leftBtn = "tab";
    }
    if (testingMode) {
      rightBtn = "tab clicked";
    } else {
      rightBtn = "tab";
    }

    return (
      <div className="wrapper" onKeyDown={this.handleKeyDown} tabIndex={0}>
        <button onClick={handleTestModeClickSetFalse} className={leftBtn}>
          Study Mode
        </button>
        <button onClick={handleTestModeClickSetTrue} className={rightBtn}>
          Testing Mode
        </button>
        <div
          className={style["div"] + " big-card"}
          onKeyDown={this.handleKeyDown}
        >
          <div className={style["question"]}>
            <h3 className="big-title">
              {currentQuestionNumber + 1}. {question}
              {correct[currentQuestionNumber] && (
                <img className="small-icon" alt="checked icon" src={checked} />
              )}
              {correct[currentQuestionNumber] === false && (
                <img className="small-icon" alt="crossed icon" src={cross} />
              )}
            </h3>
            {this.state.showAnswer ? (
              <button
                className="btn--dark btn--right"
                onClick={this.onShowClick}
              >
                Hide Answer
              </button>
            ) : (
              <button
                className="btn--dark btn--right"
                onClick={this.onShowClick}
              >
                Show Answer
              </button>
            )}
          </div>
          <div className={style["answer"]}>
            {this.state.showAnswer && <span>{answer}</span>}
            {testingMode && this.state.showAnswer && (
              <div className="test">
                <h2 className="text--dark">Did you get this right?</h2>
                <div className="btn-wrapper">
                  <button
                    onClick={this.handleCorrectClick}
                    className="btn--green"
                  >
                    Yay
                  </button>
                  <button onClick={this.handleWrongClick} className="btn--red">
                    Nay
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  private onShowClick = e => {
      console.log('ShowClick');
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };
  private handleKeyDown = e => {
    switch (e.keyCode) {
      case SPACEKEY:
        this.onShowClick(e);
        break;
      default:
        break;
    }
  };
  private handleTestModeClickSetTrue = e => {
    this.props.onTestModeClickTrue(e);
  };
  private handleTestModeClickSetFalse = e => {
    this.props.onTestModeClickFalse(e);
  };
  private handleCorrectClick = e => {
    const correct = this.state.correct;
    correct[this.props.currentQuestionNumber] = true;
    this.setState({
      correct
    });
    this.props.onCorrectAnswerClick(e);
    this.props.onNextQuestionClick(e);
  };
  private handleWrongClick = e => {
    const correct = this.state.correct;
    correct[this.props.currentQuestionNumber] = false;
    this.setState({
      correct
    });
  };
}
