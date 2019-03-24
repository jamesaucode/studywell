import React, { Component, MouseEvent } from "react";
import { logout } from "../helpers/helper";
import avatar from "../image/avatar.png";
import DropDownMenu from "./DropDownMenu";

"use strict";

const initialState = { showDropDown: false };
type State = Readonly<typeof initialState>;
type Props = {
  refreshLoginStatus: Function;
  currentUser: string;
  logged: boolean;
  style: object;
  onDarkModeSwitchClick: Function;
    onShowQuestionListClick: (event: MouseEvent)=> void;
  onCreateNewCardclick: (event : MouseEvent)=>  void;
};
export default class Navigation extends Component<Props, State> {
  readonly state: State = initialState;
  handleLogoutClick = e => {
    logout(e);
    setTimeout(() => {
      this.props.refreshLoginStatus();
    }, 1000);
  };
    handleShowQuestionListClick = e => {
        this.props.onShowQuestionListClick(e);
    }
  toggleDropDownMenu = e => {
    this.setState(prevState => ({
      showDropDown: !prevState.showDropDown
    }));
  };
    handleCreateNewCardClick = e => {
        this.props.onCreateNewCardclick(e);
    }
  componentDidMount = () => {
    this.props.refreshLoginStatus();
  };

  render() {
    const { showDropDown } = this.state;
    const { currentUser, logged, style, onDarkModeSwitchClick, onShowQuestionListClick} = this.props;
    return (
      <div className="wrapper-navbar">
        <a className="logo" href="/">
          Study Well
        </a>
        <div className="navbar">
          <button
            className={style["btn"]}
            onClick={() => onDarkModeSwitchClick()}
          >
            Light mode / Dark mode
          </button>
          {logged && <button className={style["btn"]} onClick={this.handleCreateNewCardClick}>Add Question</button> } 
        {logged && <button className={style['btn']} onClick={this.handleShowQuestionListClick}> Edit Questions</button>}
         <a href="/groups" className={style["btn"]}>
            Groups
          </a>
          {/* <button className={style["btn"]}>Shuffle</button>*/}
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
                onClick={this.toggleDropDownMenu}
              />
              <DropDownMenu
                showDropDown={showDropDown}
                currentUser={currentUser}
                handleLogoutClick={this.handleLogoutClick}
                onShowQuestionListClick={onShowQuestionListClick}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
