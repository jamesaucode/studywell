import React, { Component } from 'react'
import multiply from '../image/multiply.png'

export default class SuccessMessage extends Component {
  render() {
    const {message} = this.props
    return (
      <div className="success">
        <h1 className="success-message">{message}</h1>
        <img 
        src={multiply} 
        alt="button for closing the message"
        onClick={this.props.onCloseSuccessMessageClick} 
        className="sixteen-px">
        </img>
      </div>
    )
  }
}
