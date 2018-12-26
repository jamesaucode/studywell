import React, { Component } from 'react'

export default class Question extends Component {
  render() {
      const { i, question, answer } = this.props; 
    return (
      <div class="small-title">
        <p className="tiny-title">{i}. {question}</p>
        <p className="tiny-text">Ans: {answer}</p>
      </div>
    )
  }
}
