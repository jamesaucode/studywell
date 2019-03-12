import React, { Component } from "react";

const initialState = { show: false };
type State = Readonly<typeof initialState>;
type Props = { question: string; answer: string; style: object };

export default class Card extends Component<Props, State> {
  state = {
    show: false
  };
  render() {
    const { question, answer, style } = this.props;
    return (
      //   <div className="card">
      <div>
        {this.state.show ? (
          <div className={style["div"]}>
            <h3 className={style["text"]}>{question}</h3>
            <h3 className={style["text"]}>{answer}</h3>
            <button className="btn--dark btn--long" onClick={this.onShowClick}>
              Show
            </button>
          </div>
        ) : (
          <div className={style["div"]}>
            <h3 className={style["text"]}>{question}</h3>
            <button className="btn--dark btn--long" onClick={this.onShowClick}>
              Show
            </button>
          </div>
        )}
      </div>
    );
  }
  private onShowClick = e => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };
}
