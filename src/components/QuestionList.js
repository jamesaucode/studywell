import React, { Component } from 'react'
import Question from './Question';
import EditingQuestion from './EditingQuestion';

export default class QuestionList extends Component {
  state = {
    cardsInOrder: this.props.cardsInOrder,
    editing: false
  }
  onEditClick = e => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }
  render() {
    const cardsInOrder = this.state.cardsInOrder
    return (
      <div className="cards">
      {this.state.editing ?
      <div>
      {cardsInOrder.map(({question, answer, i}) => {
        return (
          <EditingQuestion
          question={question}
          answer={answer}
          i={i}
          />
        )
      })}
      </div>
      :
      <div>
      {cardsInOrder.sort((a,b) => a.i > b.i).map(({question, answer, i}) => {
        return (
          <Question
          question={question}
          answer={answer}
          i={i}
          />
        )
      })}
      </div>
    }
      <button onClick={this.onEditClick} class="btn--dark btn--long">Edit</button>
      </div>
    )
  }
}
