import React, { Component } from "react";
import Question from "./Question";
import EditingQuestion from "./EditingQuestion";

const initialState = {
  // cardsInOrder: this.props.cardsInOrder,
  editing: false,
  input: ""
};
type Props = { cardsInOrder: any[]; onEditSubmit: Function };
type State = Readonly<typeof initialState>;

export default class QuestionList extends Component<Props, State> {
  state = initialState;
  onEditClick = e => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  };
  render() {
    const cardsInOrder = this.props.cardsInOrder;
    return (
      <div className="cards">
        {this.state.editing ? (
          <div>
            <button onClick={this.onEditClick} className="btn--dark max-width">
              Finish Editing
            </button>
            {cardsInOrder.map(({ question, answer, id }) => {
              return (
                <EditingQuestion
                  question={question}
                  answer={answer}
                  id={id}
                  onEditSubmit={this.props.onEditSubmit}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <button onClick={this.onEditClick} className="btn--dark max-width">
              Edit
            </button>
            {cardsInOrder
              .sort((a, b) => {
                return cardsInOrder.indexOf(a) - cardsInOrder.indexOf(b);
              })
              .map(({ question, answer }) => {
                return <Question question={question} answer={answer} />;
              })}
          </div>
        )}
      </div>
    );
  }
}
