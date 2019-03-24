import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "../style/reset.css";
import "../style/main.scss";
import { switchMode, isUserLoggedIn } from "../helpers/helper";
import Navigation from "./Navigation";
import Studywell from "./Studywell";
import LoginForm from "./LoginForm";
import ProfilePage from "./ProfilePage";
import Settings from "./Settings";
import GroupList from "./GroupList";

"use strict";

const NotFoundPage = () => (
  <div>
    404 NOT FOUND - <Link to="/">Home</Link>
  </div>
);
const initialState = {
  darkMode: true,
  logged: false,
  currentUser: "Guest",
  firstname: "",
  lastname: "",
  showQuestionList: false,
  creatingNewCard: false,
  groupList: []
};
type State = Readonly<typeof initialState>;

export default class AppRouter extends Component<any, State> {
  readonly state: State = initialState;
  refreshLoginStatus = () => {
    isUserLoggedIn()
      .then(res => {
        this.checkUserLoggedIn(res.ok);
        return res.json();
      })
      .then(json => {
        this.updateUsername(json.user_name);
        this.updateFirstname(json.first_name);
        this.updateLastname(json.last_name);
        this.updateGroupList(json.groups);
      });
  };
  componentDidMount = () => {
    this.refreshLoginStatus();
  };

  render() {
    const { currentUser, darkMode, logged, firstname, lastname, showQuestionList, creatingNewCard} = this.state;
    const style = switchMode(darkMode);
    return (
      <BrowserRouter>
        <div>
          <Navigation
            refreshLoginStatus={this.refreshLoginStatus}
            currentUser={currentUser}
            logged={logged}
            style={style}
            onDarkModeSwitchClick={this.handleDarkModeSwitchClick}
            onShowQuestionListClick={this.showQuestionList}
            onCreateNewCardclick={this.createNewCard}
          />
          <Switch>
            <Route
              path="/"
              exact={true}
              render={props => <Studywell style={style} logged={logged} showQuestionList={showQuestionList} creatingNewCard={creatingNewCard} onCreateNewCardclick={this.createNewCard} toggleShowQuestionList={this.createNewCard} onShowQuestionListClick={this.showQuestionList}/>}
          />
            <Route path="/login" component={LoginForm} />
            <Route
              path="/profile"
              render={props => (
                <ProfilePage
                  logged={logged}
                  currentUser={currentUser}
                  firstname={firstname}
                  lastname={lastname}
                  style={style}
                />
              )}
            />
            <Route
              path="/groups"
              render={props => <GroupList style={style} />}
            />
            <Route path="/settings" component={Settings} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  private handleDarkModeSwitchClick = () => {
    this.setState(switchDarkMode);
  };
  private checkUserLoggedIn = (status: boolean) => {
    this.setState(checkUserLoggedIn(status));
  };
    private showQuestionList = () => {
        this.setState(onShowQuestionListClick);
    }
    private createNewCard = () => {
        this.setState(onCreateNewCardclick);
    }
  private updateUsername = (name: string) => {
    this.setState({ currentUser: name });
  };
  private updateFirstname = (name: string) => {
    this.setState({ firstname: name });
  };
  private updateLastname = (name: string) => {
    this.setState({ lastname: name });
  };
  private updateGroupList = (groups: never[]) => {
    this.setState({ groupList: groups });
  };
}
const switchDarkMode = (prevState: State) => ({
  darkMode: !prevState.darkMode
});
const checkUserLoggedIn = (status: boolean) => ({
  logged: status
});
const onShowQuestionListClick = (prevState : State) => ({
    showQuestionList: !prevState.showQuestionList
})
const onCreateNewCardclick = (prevState : State) => ({
    creatingNewCard: !prevState.creatingNewCard
})
