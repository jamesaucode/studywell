import React, { Component } from "react";

"use strict";

type Props = { style: object };
const initialState = {
  groups: [{ group_name: "testing", major: "hehe", id: "dashk232" }]
};
type State = { groups: { group_name: string; major: string; id: string }[] };
export default class GroupList extends Component<Props, State> {
  readonly state: State = initialState;
  componentDidMount = () => {
    fetch("/groups")
      .then(res => res.json())
      .then(json => {
        this.setState({ groups: json });
      });
  };

  render() {
    const { groups } = this.state;
    return (
      <div className="dark-mode">
        <h1>Group List Here</h1>
        <ul>
          {groups.map(group => {
            return <li>{group.group_name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
