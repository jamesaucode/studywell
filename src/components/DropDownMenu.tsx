import React, { MouseEvent, SFC } from "react";

"use strict";

type Props = {
  showDropDown: boolean;
  currentUser: string;
  handleLogoutClick(e: MouseEvent): void;
  onShowQuestionListClick(e : MouseEvent) : void;
};

const DropDownMenu: SFC<Props> = ({
  currentUser,
  handleLogoutClick,
    showDropDown,
    onShowQuestionListClick
}) => {
  return (
    <div className="dropdown">
      <div
        className={showDropDown ? "dropdown-content--show" : "dropdown-content"}
      >
        <a className="option" href="/profile">
          Profile
        </a>
        <a className="option" onClick={onShowQuestionListClick}>
            Questions
        </a>
        <a className="option" href="/settings">
          Settings
        </a>
        <div onClick={e => handleLogoutClick(e)} className="option">
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
