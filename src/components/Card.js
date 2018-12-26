import React, { Component } from 'react'

export default class Card extends Component {
    state = {
        show: false
    }
    onShowClick = (e) => {
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }
  render() {
    const {question, answer, style} = this.props
    return (
    //   <div className="card">
    <div>
        {this.state.show ?
        <div className={style.div}>
            <h3 className={style.text}>{question}</h3>
            <h3 className={style.text}>{answer}</h3>
            <button className="btn--dark btn--long" onClick={this.onShowClick}>Show</button>
        </div>
        :
        <div className={style.div}>
            <h3 className={style.text}>{question}</h3>
            <button className="btn--dark btn--long" onClick={this.onShowClick}>Show</button>
        </div>
        }
    </div>
    )
  }
}
