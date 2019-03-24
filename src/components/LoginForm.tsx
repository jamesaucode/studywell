import React, { Component } from "react";
import SuccessMessage from "./SuccessMessage";
import { Redirect } from "react-router-dom";

"use strict";

const initialState = {
  username: "",
  password: "",
  successMessage: false,
  message: "",
  loggedIn: false,
  signup: false
};
type State = Readonly<typeof initialState>;

export default class LoginForm extends Component<object, State> {
  readonly state: State = initialState;
  componentDidMount = () => {
    this.isUserLoggedIn().then(status => {
      if (status === true) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  };
  render() {
    const {
      successMessage,
      message,
      username,
      password,
      loggedIn,
      signup
    } = this.state;
    if (loggedIn) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="login-form">
          {/*<SuccessMessage show={successMessage} message={message} /> */}
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
        {signup ? (
          <div>
            <button className="btn" onClick={this.signup}>
              Sign up
            </button>
            <p>
              I have an account!
              <button className="link" onClick={this.onSignupClick}>
                Login
              </button>
            </p>
          </div>
        ) : (
          <div>
            <button className="btn" onClick={this.login}>
              Login
            </button>
            <p>
              Don't have an account?
              <button className="link" onClick={this.onSignupClick}>
                Sign up!
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
  private clearPasswordField = () => {
    this.setState({
      password: ""
    });
  };
  private login = e => {
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Username does not exist or incorrect password.");
        }
      })
      .then(
        json => {
          this.clearPasswordField();
          this.setState({
            successMessage: true,
            message: json.message,
            loggedIn: true
          });
        },
        error => {
          console.error("Access denied." + error.message);
          this.clearPasswordField();
        }
      );
  };
  private signup = e => {
    fetch("/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            "Can't register this user. Username might exist already."
          );
        }
      })
      .then(
        json => {
          this.clearPasswordField();
          this.setState({
            successMessage: true,
            message: json.message
          });
        },
        error => {
          console.error(error.message);
          this.clearPasswordField();
        }
      );
  };

  private isUserLoggedIn() {
    return fetch("/check").then(res => {
      return res.ok;
    });
  }

  private hideSuccessMessage = () => {
    setTimeout(() => {
      this.setState({
        successMessage: false
      });
    }, 5000);
  };
  private onUserNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };
  private onPasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  private onSignupClick = e => {
    this.setState(prevState => ({
      signup: !prevState.signup
    }));
  };
}
