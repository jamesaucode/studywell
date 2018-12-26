import React, { Component } from 'react'

export default class EditingQuestion extends Component {
    state = {
        question: this.props.question,
        answer: this.props.answer,
        i: this.props.i,
        questionInput: '',
        answerInput: '',
        iInput: ''
    }
    onQuestionInputChange = e => {
        this.setState({
            question: e.target.value
        })
    }
    onAnswerInputChange = e => {
        this.setState({
            answer: e.target.value
        })
    }
  render() {
    const { question, answer, i } = this.state
    return (
      <div className="small-title">
        <h1 className="tiny-title">Editing Question no.{i}</h1>
        <input onChange={this.onQuestionInputChange} type="text" value={question}></input>
        <textarea onChange={this.onAnswerInputChange} type="text" value={answer} />
      </div>
    )
  }
}
