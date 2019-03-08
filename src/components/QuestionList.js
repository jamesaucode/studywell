import React, { Component } from "react";
import Question from "./Question";
import EditingQuestion from "./EditingQuestion";
import PropTypes from "prop-types";

export default class QuestionList extends Component {
  state = {
    cardsInOrder: this.props.cardsInOrder,
    editing: false,
    input: ""
  };
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
              .sort((a, b) => cardsInOrder.indexOf(a) > cardsInOrder.indexOf(b))
              .map(({ question, answer }) => {
                return <Question question={question} answer={answer} />;
              })}
          </div>
        )}
      </div>
    );
  }
}

QuestionList.propTypes = {
  cardsInOrder: PropTypes.array
};
