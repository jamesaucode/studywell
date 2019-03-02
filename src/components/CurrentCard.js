import React, { Component } from "react";
import checked from "../image/checked.png";
import cross from "../image/cross.png";

export default class CurrentCard extends Component {
  state = {
    showAnswer: false,
    correct: [],
    testingMode: this.props.testingMode,
    // For normal mode
    studyModeTab: !this.props.testingMode,
    // For testingMode mode
    testingModeTab: this.props.testingMode
  };
  onShowClick = e => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };
  handleKeyDown = e => {
    const spaceKey = 32;
    switch (e.keyCode) {
      case spaceKey:
        this.onShowClick(e);
        break;
      default:
        break;
    }
  };
  handleTestModeClickSetTrue = e => {
    this.props.onTestModeClickTrue();
    this.setState({
      testingMode: this.props.testingMode,
      studyModeTab: this.props.testingMode
    });
  };
  handleTestModeClickSetFalse = e => {
    this.props.onTestModeClickFalse();
    this.setState({
      testingMode: this.props.testingMode,
      testingModeTab: this.props.testingMode
    });
  };
  handleCorrectClick = e => {
    const correct = this.state.correct;
    correct[this.props.currentQuestionNumber] = true;
    this.setState({
      correct
    });
    this.props.onCorrectAnswerClick(e);
    this.props.onNextQuestionClick(e);
  };
  handleWrongClick = e => {
    const correct = this.state.correct;
    correct[this.props.currentQuestionNumber] = false;
    this.setState({
      correct
    });
  };
  componentDidMount = e => {
    const initializeCorrect = new Array(this.props.length);
    this.setState({
      correct: initializeCorrect
    });
  };
  render() {
    const { question, answer, style, currentQuestionNumber } = this.props;
    const { testingMode } = this.props;
    const { correct } = this.state;
    const { handleTestModeClickSetFalse, handleTestModeClickSetTrue } = this;
    var leftBtn = "";
    var rightBtn = "";
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
      <div className="wrapper">
        <button onClick={handleTestModeClickSetFalse} className={leftBtn}>
          Study Mode
        </button>
        <button onClick={handleTestModeClickSetTrue} className={rightBtn}>
          Testing Mode
        </button>
        <div
          className={style.div + " big-card"}
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
        >
          <div className={style.question}>
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
          <div className={style.answer}>
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
}
