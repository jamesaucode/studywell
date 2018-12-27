import React, { Component } from "react";

export default class CurrentCard extends Component {
  state = {
    show: false,
    answered: false
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
        break
    }
  };
  // componentDidMount = () => {
  //   document.addEventListener("keydown", this.handleKeyDown, false);
  // };
  render() {
    const { question, answer, style, qnum } = this.props;
    return (
      <div 
      className={style.div + " big-card"}
      tabIndex="0"
      onKeyDown={this.handleKeyDown}>
        <div className={style.question}>
          <h3 className="big-title">
            {qnum + 1}. {question}
          </h3>
          {this.state.show ? (
            <button className="btn--dark btn--right" onClick={this.onShowClick}>
              Hide
            </button>
          ) : (
            <button className="btn--dark btn--right" onClick={this.onShowClick}>
              Show
            </button>
          )}
        </div>
        <h3 className={style.answer}>
          {this.state.show && <span>{answer}</span>}
        </h3>
      </div>
    );
  }
}
