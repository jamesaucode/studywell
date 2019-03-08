import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Button extends Component {
  render() {
    const { name, style, clicked, onClick } = this.props;
    if (clicked) {
      return (
        <button onClick={onClick} className={style.btnL + " btn--big"}>
          {name}
        </button>
      );
    } else {
      return (
        <button className={style.btnN + " btn--big"} onClick={onClick}>
          {name}
        </button>
      );
    }
  }
}

Button.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  clicked: PropTypes.bool,
  onClick: PropTypes.func
};
