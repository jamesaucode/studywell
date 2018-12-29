import React, { Component } from "react";
import Question from "./Question";
import EditingQuestion from "./EditingQuestion";

export default class QuestionList extends Component {
  state = {
    cardsInOrder: this.props.cardsInOrder,
    editing: false,
    input:''
  };
  onEditClick = e => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  };
  render() {
    console.log(this.state.input);
    const cardsInOrder = this.props.cardsInOrder;
    return (
      <div className="cards">
        {this.state.editing ? (
          <div>
            <button onClick={this.onEditClick} className="btn--dark max-width">
              Finish Editing
            </button>
            {cardsInOrder.map(({ question, answer, i, id }) => {
              return (
                <EditingQuestion 
                question={question} 
                answer={answer} 
                i={i} 
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
              .sort((a, b) => a.i > b.i)
              .map(({ question, answer, i }) => {
                return <Question question={question} answer={answer} i={i} />;
              })}
          </div>
        )}
      </div>
    );
  }
}
