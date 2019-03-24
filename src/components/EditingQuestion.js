import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class EditingQuestion extends Component {
  state = {
    card: {
      question: this.props.question,
      answer: this.props.answer,
      uuid: this.props.uuid,
    },
    questionInput: '',
    answerInput: '',
    focused: false,
  };
  onQuestionInputChange = e => {
    this.setState({
      card: {
        question: e.target.value,
        answer: this.props.answer,
        uuid: this.props.uuid,
      },
    });
  };
  onAnswerInputChange = e => {
    this.setState({
      card: {
        question: this.props.question,
        answer: e.target.value,
        uuid: this.props.uuid,
      },
    });
  };
  onBlur = e => {
    console.log(this.state);
    this.setState({
      focused: false,
    });
  };
  onFocus = e => {
    this.setState({
      focused: true,
    });
    e.target.select();
  };
  handleEditClick = () => {
    this.props.onEditSubmit(this.state.card);
    console.log('editted');
    this.onBlur();
  };

  deleteItem = e => {
    console.log('Deleting' + this.props.uuid);
    fetch('/cards', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        uuid: this.props.uuid,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Could not delete this item!');
        }
      })
      .then(json => console.log(json));
    // Handle the frontend of deleting the item
    this.props.onDeleteItem(this.props.uuid);
  };
  render() {
    const {question, answer} = this.state.card;
    return (
      <div className="small-title">
        <div>
          <textarea
            rows="3"
            cols="40"
            onFocus={this.onFocus}
            onBlur={this.handleEditClick}
            value={question}
            onChange={this.onQuestionInputChange}
            className="tiny-title"
          />
          <textarea
            onFocus={this.onFocus}
            onBlur={this.handleEditClick}
            value={answer}
            onChange={this.onAnswerInputChange}
            name="text"
          />
        </div>
        <i onClick={this.deleteItem} className="fas fa-trash" />
      </div>
    );
  }
}

EditingQuestion.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  uuid: PropTypes.string,
};
