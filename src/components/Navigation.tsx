import React, { Component } from "react";
import { logout } from "../helpers/helper";
import avatar from "../image/avatar.png";

const initialState = { showDropDown: false };
type State = Readonly<typeof initialState>;
type Props = {
  refreshLoginStatus: Function;
  currentUser: string;
  logged: boolean;
  style: object;
  onDarkModeSwitchClick: Function;
};
export default class Navigation extends Component<Props, State> {
  readonly state: State = initialState;
  handleLogoutClick = e => {
    logout(e);
    setTimeout(() => {
      this.props.refreshLoginStatus();
    }, 1000);
  };
  profilePopUp = e => {
    console.log(e);
    this.setState(prevState => ({
      showDropDown: !prevState.showDropDown
    }));
  };
  componentDidMount = () => {
    this.props.refreshLoginStatus();
  };

  render() {
    const { showDropDown } = this.state;
    const { currentUser, logged, style, onDarkModeSwitchClick } = this.props;
    return (
      <div className="wrapper-navbar">
        <a href="/">Home</a>
        <div className="navbar">
          <button
            className={style["btn"]}
            onClick={() => onDarkModeSwitchClick()}
          >
            Light mode / Dark mode
          </button>
          {true ? (
            <button
              className={style["btn"]}
              // onClick={this.onshowAllQuestionsClick}
            >
              Hide all questions
            </button>
          ) : (
            <button
              className={style["btn"]}
              // onClick={this.onshowAllQuestionsClick}
            >
              Show all questions
            </button>
          )}
          <button className={style["btn"]}>Shuffle</button>
          <button className={style["btn"]}>Add Question</button>
          {logged ? null : (
            <a href="/login" className={style["btn"]}>
              Login
            </a>
          )}
          {!logged && <button className={style["btn"]}>Sign up</button>}

          {logged && (
            <div className="wrapper--user">
              <img
                className="avatar"
                src={avatar}
                alt="avatar"
                onClick={this.profilePopUp}
              />
              <div className="dropdown">
                <div
                  className={
                    showDropDown ? "dropdown-content--show" : "dropdown-content"
                  }
                >
                  <a className="option" href="/profile">
                    Profile
                  </a>
                  <a className="option" href="/settings">
                    Settings
                  </a>
                  <div
                    onClick={e => this.handleLogoutClick(e)}
                    className="option"
                  >
                    <span>Logout</span>
                  </div>
                </div>
                <span className="username">{currentUser}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
