import React, { Component } from "react";
import SuccessMessage from "./SuccessMessage";
import PropTypes from "prop-types";

export default class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    successMessage: false,
    message: ""
  };
  login = e => {
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      Vary: "Cookie",
      body: JSON.stringify({
        user_name: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          successMessage: true,
          message: json.message,
          login: "",
          password: ""
        })
      );
    this.props.onLoginClick();
    this.props.getUserData();
  };

  hideSuccessMessage = () => {
    setTimeout(() => {
      this.setState({
        successMessage: false
      });
    }, 5000);
  };
  onUserNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };
  onPasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  render() {
    const { successMessage, message, username, password } = this.state;
    const show = true;
    return (
      show && (
        <div className="login-form">
          <SuccessMessage show={successMessage} message={message} />
          <input
            onChange={this.onUserNameChange}
            name="user_name"
            placeholder="Username"
            value={username}
          />
          <input
            onChange={this.onPasswordChange}
            name="password"
            placeholder="Password"
            value={password}
            type="password"
          />
          <button onClick={this.login}>Login</button>
        </div>
      )
    );
  }
}

LoginForm.propTypes = {
  onLoginClick: PropTypes.func,
  getUserData: PropTypes.func
};
