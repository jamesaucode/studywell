import React, { Component } from "react";
import Card from "./Card";
import uuid from "uuid";
import axios from "axios";
import Button from "./Button";
import Slide from "./Slide";
import EditableNewCard from "./EditableNewCard";
import CurrentCard from "./CurrentCard";
import QuestionList from "./QuestionList";
import SuccessMessage from "./SuccessMessage";

export default class Dashboard extends Component {
  state = {
    cards: [
      {
        question: "Your mom",
        answer: "Fat",
        i: 1,
        id: uuid()
      },
      {
        question: "My mom",
        answer: "Not fat",
        i: 2,
        id: uuid()
      },
      {
        question: "Kappa",
        answer: "Poggers",
        i: 3,
        id: uuid()
      }
    ],
    darkMode: true,
    leftBtnClicked: false,
    rightBtnClicked: false,
    collapse: false,
    playing: false,
    newCard: false,
    dim: false,
    testing: false,
    success: false,
    correct: 0,
    qnum: 0
  };
  handleShuffleClick = () => {
    this.onShuffleClick();
    this.setState({
      qnum: 0
    });
  };
  onShuffleClick = () => {
    var cards = this.state.cards;
    var j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = cards[i];
      cards[i] = cards[j];
      cards[j] = x;
    }
  };
  onCollapseClick = e => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };
  onLastQuestionClick = e => {
    const qnum = this.state.qnum;
    if (qnum <= 0) {
      this.setState({
        qnum: this.state.cards.length - 1
      });
    } else {
      this.setState(prevState => ({
        qnum: prevState.qnum - 1
      }));
    }
    this.setState({
      rightBtnClicked: false,
      leftBtnClicked: true
    });
  };
  onNextQuestionClick = e => {
    this.setState(prevState => ({
      qnum: (prevState.qnum + 1) % this.state.cards.length,
      rightBtnClicked: true,
      leftBtnClicked: false
    }));
  };
  onModeClick = e => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  };
  onEditSubmit = ({ question, answer, id }) => {
    this.setState({
      cards: this.state.cards.map(card => {
        if (id === card.id) {
          return Object.assign({}, card, {
            question,
            answer,
            id
          });
        } else {
          return card;
        }
      })
    });
  };
  onAddQuestionClick = e => {
    this.setState({
      newCard: true
    });
  };

  onSubmit = (question, answer, id) => {
    const newCard = {
      question,
      answer,
      id,
      i: this.state.cards.length + 1
    };
    this.setState(prevState => ({
      cards: prevState.cards.concat(newCard),
      success: true
    }));
    this.onCancelClick();
  };
  onCancelClick = e => {
    this.setState({
      newCard: false
    });
  };
  onStartClick = e => {
    this.setState(prevState => ({
      playing: !prevState.playing
    }));
  };
  handleKeyDown = e => {
    if (this.state.playing) {
      switch (e.keyCode) {
        case 39:
          this.onNextQuestionClick(e);
          break;
        case 37:
          this.onLastQuestionClick(e);
          break;
        default:
          break;
      }
    }
    if (this.state.dim) {
      if (e.keyCode === 27) {
        this.onDimClick(e);
      }
    }
  };
  onDimClickOff = e => {
    if (this.state.dim === true) {
      this.setState({
        dim: false
      });
    }
  };
  onCloseSuccessMessageClick = e => {
    this.setState({
      success:false
    })
  }
  onDimClick = e => {
    this.setState(prevState => ({
      dim: !prevState.dim
    }));
  };
  onTestModeClickTrue = e => {
    this.setState({
      testing: true
    });
  };
  onTestModeClickFalse = e => {
    this.setState({
      testing: false
    });
  };
  onCorrectAnswerClick = e => {
    this.setState(prevState => ({
      correct: prevState.correct + 1
    }));
  };
  async testSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:8081/", {
        question: e.target.value,
        answer: "sajdkhask"
      })
      .catch(error => console.log(error));
  }
  componentDidMount = () => {
    console.log("Mounted!");
  };

  render() {
    const cardsInOrder = this.state.cards;
    const {
      collapse,
      qnum,
      darkMode,
      playing,
      newCard,
      correct,
      testing
    } = this.state;
    var darkModeString = "dark-mode";
    var style = {};
    if (!darkMode) {
      darkModeString = "light-mode";
      style = {
        btnL: "btn--light--last",
        btnN: "btn--light--next",
        btn: "btn--light",
        cards: "cards--dark",
        card: {
          div: "card--light",
          question: "question--light",
          answer: "answer--light"
        }
      };
    } else {
      darkModeString = "dark-mode";
      style = {
        btnL: "btn--dark--next",
        btnN: "btn--dark--last",
        btn: "btn--dark",
        cards: "cards--dark",
        card: {
          div: "card--dark",
          question: "question--dark",
          answer: "answer--dark"
        }
      };
    }
    return (
      <div
        tabIndex="0"
        onKeyDown={this.onDimClickOff}
        className={darkModeString}
      >
        {this.state.dim && <div className="dimmer" />}
        <div>
          <button className={style.btn} onClick={this.onModeClick}>
            Light mode / Dark mode
          </button>
          {collapse ? (
            <button className={style.btn} onClick={this.onCollapseClick}>
              Hide all questions
            </button>
          ) : (
            <button className={style.btn} onClick={this.onCollapseClick}>
              Show all questions
            </button>
          )}
          {playing ? (
            <button className={style.btn} onClick={this.onStartClick}>
              Stop
            </button>
          ) : (
            <button className={style.btn} onClick={this.onStartClick}>
              Start
            </button>
          )}

          <button className={style.btn} onClick={this.handleShuffleClick}>
            Shuffle
          </button>
          <button onClick={this.onAddQuestionClick} className={style.btn}>
            Add Question
          </button>
          <button className={style.btn} onClick={this.onDimClick}>
            Show hotkey
          </button>
        </div>
        {this.state.dim && 
        <div className="hotkeys">
            <h2>HOTKEYS!</h2>
        </div>}
        {/* Show success message when user answered all answer correctly */}
        {correct === this.state.cards.length &&
        <SuccessMessage
        message="You answered all the questions correctly! Congratulations!"
        onCloseSuccessMessageClick={this.onCloseSuccessMessageClick}
        />}
        {/* Show success message for new card  */}
        {this.state.success && 
        <SuccessMessage 
        message="A new card is added!"
        onCloseSuccessMessageClick={this.onCloseSuccessMessageClick} 
        />}
        {newCard && (
          <EditableNewCard
            style={style.card}
            onSubmit={this.onSubmit}
            onCancelClick={this.onCancelClick}
          />
        )}
        {collapse && (
          <QuestionList
            cardsInOrder={cardsInOrder}
            onEditSubmit={this.onEditSubmit}
          />
        )}
        {playing && (
          <div className="margin-auto-center"tabIndex="0" onKeyDown={this.handleKeyDown}>
            <CurrentCard
              question={this.state.cards[qnum].question}
              answer={this.state.cards[qnum].answer}
              style={style.card}
              qnum={qnum}
              testing={this.state.testing}
              length={this.state.cards.length}
              onTestModeClickFalse={this.onTestModeClickFalse}
              onTestModeClickTrue={this.onTestModeClickTrue}
              onCorrectAnswerClick={this.onCorrectAnswerClick}
              onNextQuestionClick={this.onNextQuestionClick}
            />
            <div className="btns">
              <Button
                name="&#8592; Previous"
                style={style}
                onClick={this.onLastQuestionClick}
                clicked={this.state.leftBtnClicked}
              />
              <Button
                name="Next &#8594;"
                style={style}
                onClick={this.onNextQuestionClick}
                clicked={this.state.rightBtnClicked}
              />
            </div>
          </div>
        )}
        {playing && testing && (
          <Slide correct={correct} length={this.state.cards.length} />
        )}
      </div>
    );
  }
}
