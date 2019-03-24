import React, { Component,MouseEvent } from "react";
import Question from "./Question";
import EditingQuestion from "./EditingQuestion";

'use strict'

const initialState = {
  editing: false,
  input: ""
};
type Props = { cardsInOrder: any[]; onEditSubmit: Function; onShowQuestionListClick: (event : MouseEvent)=> void; onDeleteItem: (event : MouseEvent)=> void;};
type State = Readonly<typeof initialState>;

export default class QuestionList extends Component<Props, State> {
  state = initialState;
  onEditClick = e => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  };
  render() {
    const { onEditSubmit, cardsInOrder , onShowQuestionListClick, onDeleteItem} = this.props;
    return (
      <div className="wrapper--question-list">
        {true && (
          <div className="question-list">
            <button onClick={onShowQuestionListClick} className="btn--dark max-width">
              Finish Editing
            </button>
            {cardsInOrder.map(({ question, answer, uuid }) => {
              return (
                <EditingQuestion
                  question={question}
                  answer={answer}
                  uuid={uuid}
                  onEditSubmit={this.props.onEditSubmit}
                  onDeleteItem={onDeleteItem}
                />
              );
            })}
          </div>
          ) 
            //        : (
            // <d//        iv>
            //        <button onClick={this.onEditClick} className="btn--dark max-width">
            //            Edit
            //        </button>
            //        {cardsInOrder
            //          .sort((a, b) => {
            //            return cardsInOrder.indexOf(a) - cardsInOrder.indexOf(b);
            //          })
            //          .map(({ question, answer }) => {
            //            return <Question question={question} answer={answer} />;
            //          })}
            //  <///        div>
            // )}
            }
      </div>
    );
  }
}
