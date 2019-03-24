import React, { Component } from "react";
import avatar from "../image/avatar.png";

"use strict";

type Props = {
  logged: boolean;
  currentUser: string;
  firstname: string;
  lastname: string;
  style: object;
};

const OVERVIEW = 1;
const GROUPS = 2;
const QUESTIONS = 3;

// const initialState = { viewing: OVERVIEW };
// type State = Readonly<typeof initialState>;
type State = {
  viewing: number;
  currentUser: string;
  firstname: string;
  lastname: string;
};
export default class ProfilePage extends Component<Props, State> {
  // readonly state: State = initialState;
  readonly state: State = {
    viewing: OVERVIEW,
    currentUser: this.props.currentUser,
    firstname: this.props.firstname,
    lastname: this.props.lastname
  };
  render() {
    const { logged, currentUser, firstname, lastname, style } = this.props;
    const { viewing } = this.state;
    return (
      logged && (
        <div className="dark-mode">
          <div className="navbar">
            <button
              onClick={this.onOverviewClick}
              className={
                viewing === OVERVIEW
                  ? style["link"] + " active-link"
                  : style["link"]
              }
            >
              Overview
            </button>
            <button
              onClick={this.onGroupsClick}
              className={
                viewing === GROUPS
                  ? style["link"] + " active-link"
                  : style["link"]
              }
            >
              Groups
            </button>
            <button
              onClick={this.onQuestionsClick}
              className={
                viewing === QUESTIONS
                  ? style["link"] + " active-link"
                  : style["link"]
              }
            >
              Questions
            </button>
          </div>
          <div className="profile-page">
            <div className="flex align-items-center space-between small-gutter-top-bottom border-bottom">
              <div className="wrapper--left-float">
                <h1 className="profile-page--username">{currentUser}</h1>
                <h2 className="profile-page--email">aucbjames@gmail.com </h2>
              </div>
              <img className="profile-page--avatar" src={avatar} />
            </div>
            <div className="flex align-items-center space-between small-gutter-top-bottom">
              <label className="profile-page--label">Username: </label>
              <input className="profile-page--input" value={currentUser} />
            </div>
            <div className="flex align-items-center space-between small-gutter-top-bottom">
              <label className="profile-page--label">*Password: </label>
              <input
                type="password"
                className="profile-page--input"
                placeholder="Password"
              />
            </div>
            <div className="flex align-items-center space-between small-gutter-top-bottom">
              <label className="profile-page--label">New Password: </label>
              <input
                type="password"
                className="profile-page--input"
                placeholder="New Password"
              />
            </div>
            <div className="flex align-items-center space-between small-gutter-top-bottom">
              <label className="profile-page--label">First Name: </label>
              <input className="profile-page--input" value={firstname} />
            </div>
            <div className="flex align-items-center space-between small-gutter-top-bottom">
              <label className="profile-page--label">Last Name: </label>
              <input className="profile-page--input" value={lastname} />
            </div>
            <button className="profile-page--btn">Save</button>
          </div>
        </div>
      )
    );
  }

  private onOverviewClick = () => {
    this.setState({
      viewing: OVERVIEW
    });
  };

  private onGroupsClick = () => {
    this.setState({
      viewing: GROUPS
    });
  };

  private onQuestionsClick = () => {
    this.setState({
      viewing: QUESTIONS
    });
  };
}
