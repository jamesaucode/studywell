import React, { Component } from "react";

export default class Button extends Component {
  render() {
    const { name, style, clicked } = this.props;
    if (clicked) {
      return (
        <button className={style.btnL + " btn--big"}>{name}</button>
      );
    } else {
      return <button className={style.btnN + " btn--big"}>{name}</button>;
    }
  }
}
