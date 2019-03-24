import React, { MouseEvent, SFC } from "react";

type Props = { onStartClick : (event : MouseEvent<HTMLElement>) => void; onAddQuestionClick : (event : MouseEvent<HTMLElement>) => void; 
    onNextQuestionClick : (event : MouseEvent<HTMLElement>) => void; onLastQuestionClick : (event : MouseEvent<HTMLElement>) => void;
}

const Controls : SFC<Props> = ({ onStartClick , onAddQuestionClick, onLastQuestionClick, onNextQuestionClick})=> {
    return (
      <div className="control-panel">
        <i onClick={onLastQuestionClick} className="fas fa-backward" />
        <i onClick={onStartClick} className="fas fa-stop" />
        <i onClick={onNextQuestionClick} className="fas fa-forward" />
        {/* <i onClick={onAddQuestionClick} className="fas fa-plus-square"></i>*/}
      </div>
    );
  };
export default Controls;
