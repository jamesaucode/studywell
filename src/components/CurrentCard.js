import React, { Component } from "react";

export default class CurrentCard extends Component {
  state = {
    show: false,
    answered: false,
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
    this.setState({
      testing: true
    });
  };
  handleTestModeClickSetFalse = e => {
    this.setState({
      testing: false
    });
  };
  handleCorrectClick = e => {
    alert('Correct!')
    this.props.onCorrectAnswerClick(e);
    this.props.onNextQuestionClick(e);
  }
  handleWrongClick = e => {
    alert('Wrong!')
  }
  // componentDidMount = () => {
  //   document.addEventListener("keydown", this.handleKeyDown, false);
  // };
  render() {
    const {
      question,
      answer,
      style,
      qnum,
      onTestModeClickFalse,
      onTestModeClickTrue
    } = this.props;
    const { testing } = this.state;
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
            {/* {!this.state.show && <div className="placeholder--200px"></div>} */}
            {testing && (
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
