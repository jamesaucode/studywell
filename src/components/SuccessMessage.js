import React, { Component } from "react";
import PropTypes from "prop-types";
import multiply from "../image/multiply.png";

export default class SuccessMessage extends Component {
  state = {
    show: this.props.show
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, 5000);
  };

  render() {
    const { show } = this.state;
    const { message } = this.props;
    return show ? (
      <div className="success">
        <h1 className="success-message">{message}</h1>
        <img
          src={multiply}
          alt="button for closing the message"
          onClick={this.props.onCloseSuccessMessageClick}
          className="sixteen-px"
        />
      </div>
    ) : null;
  }
}

SuccessMessage.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string
};
