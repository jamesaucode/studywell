import React, { Component } from "react";
import checked from '../image/checked.png';
import cross from '../image/cross.png';

export default class CurrentCard extends Component {
  state = {
    show: false,
    correct: [],
    testing: this.props.testing,
    // For normal mode
    lTabClicked: !this.props.testing,
    // For testing mode
    rTabClicked: this.props.testing
  };
  onShowClick = e => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };
  handleKeyDown = e => {
    switch (e.keyCode) {
      case 32:
        console.log("Show answer!");
        this.onShowClick(e);
        break;
      default:
        break;
    }
  };
  handleTestModeClickSetTrue = e => {
    this.props.onTestModeClickTrue();
    this.setState({
      testing: this.props.testing,
      lTabClicked: this.props.testing
    });
  };
  handleTestModeClickSetFalse = e => {
    this.props.onTestModeClickFalse();
    this.setState({
      testing: this.props.testing,
      rTabClicked: this.props.testing
    });
  };
  handleCorrectClick = e => {
    alert('Correct!')
    const correct = this.state.correct
    correct[this.props.qnum] = true
    this.setState({
      correct
    })
    this.props.onCorrectAnswerClick(e);
    this.props.onNextQuestionClick(e);
  }
  handleWrongClick = e => {
    alert('Wrong!')
    const correct = this.state.correct
    correct[this.props.qnum] = false
    this.setState({
      correct
    })
  }
  componentDidMount = e => {
    const initializeCorrect = new Array(this.props.length)
    this.setState(
    {
      correct: initializeCorrect
    })
  }
  render() {
    const {
      question,
      answer,
      style,
      qnum,
      onTestModeClickFalse,
      onTestModeClickTrue
    } = this.props;
    const { testing } = this.props;
    const { correct } = this.state;
    const { handleTestModeClickSetFalse, handleTestModeClickSetTrue } = this;
    var leftBtn = "";
    var rightBtn = "";
    if (!testing) {
      leftBtn = "tab clicked";
    } else {
      leftBtn = "tab";
    }
    if (testing) {
      rightBtn = "tab clicked";
    } else {
      rightBtn = "tab";
    }

    return (
      <div className="wrapper">
        <button onClick={handleTestModeClickSetFalse} className={leftBtn}>
          Study mode
        </button>
        <button onClick={handleTestModeClickSetTrue} className={rightBtn}>
          Testing mode
        </button>
        <div
          className={style.div + " big-card"}
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
        >
          <div className={style.question}>
            <h3 className="big-title">
              {qnum + 1}. {question}
              { (correct[qnum]) && <img className="small-icon" src={checked}></img>}
              { (correct[qnum] === false) && <img className="small-icon" src={cross}></img>}
            </h3>
            {this.state.show ? (
              <button
                className="btn--dark btn--right"
                onClick={this.onShowClick}
              >
                Hide
              </button>
            ) : (
              <button
                className="btn--dark btn--right"
                onClick={this.onShowClick}
              >
                Show
              </button>
            )}
          </div>
          <div className={style.answer}>
            {this.state.show && <span>{answer}</span>}
            {(testing && this.state.show) && (
              <div className="test">
              <h2 className="text--dark">Did you get this right?</h2>
                <div className="btn-wrapper">
                  <button onClick={this.handleCorrectClick} className="btn--green">Yay</button>
                  <button onClick={this.handleWrongClick} className="btn--red">Nay</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
