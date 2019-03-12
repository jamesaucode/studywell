import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "../style/main.scss";
import { switchMode, isUserLoggedIn } from "../helpers/helper";
import Navigation from "./Navigation";
import Studywell from "./Studywell";
import LoginForm from "./LoginForm";
import ProfilePage from "./ProfilePage";
import Settings from "./Settings";
const NotFoundPage = () => (
  <div>
    404 NOT FOUND - <Link to="/">Home</Link>
  </div>
);
const initialState = { darkMode: true, logged: false, currentUser: "Guest" };
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
        this.updateUsername(json.message);
      });
  };
  componentDidMount = () => {
    this.refreshLoginStatus();
  };

  render() {
    const { currentUser, darkMode, logged } = this.state;
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
          />
          <Switch>
            <Route
              path="/"
              exact={true}
              render={props => <Studywell style={style} logged={logged} />}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/profile" component={ProfilePage} />
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
  private updateUsername = (name: string) => {
    this.setState({ currentUser: name });
  };
}

const switchDarkMode = (prevState: State) => ({
  darkMode: !prevState.darkMode
});
const checkUserLoggedIn = (status: boolean) => ({
  logged: status
});
