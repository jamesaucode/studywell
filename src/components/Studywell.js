import React, { Component } from "react";
import uuid from "uuid";
import Button from "./Button";
import Slide from "./Slide";
import EditableNewCard from "./EditableNewCard";
import CurrentCard from "./CurrentCard";
import QuestionList from "./QuestionList";
import SuccessMessage from "./SuccessMessage";
import LoginForm from "./LoginForm";
import { logout, switchMode, shuffleCards } from "../helpers/helper";

const RIGHTARROW = 39;
const LEFTARROW = 37;

export default class StudyWell extends Component {
  state = {
    // Dummy data for testing
    cards: [
      {
        question: "Test question 1",
        answer: "Answer 1",
        // i: 1,
        id: uuid()
      },
      {
        question: "Test question 2",
        answer: "Answer 2",
        // i: 2,
        id: uuid()
      }
    ],
    darkMode: true,
    leftBtnClicked: false,
    rightBtnClicked: false,
    showAllQuestions: false,
    playing: false,
    creatingNewCard: false,
    testingMode: false,
    message: "",
    correct: 0,
    currentQuestionNumber: 0
  };

  resetCurrentQuestionNumber = () => {
    this.setState({
      currentQuestionNumber: 0
    });
  };

  handleShuffleClick = () => {
    this.onShuffleClick();
    this.resetCurrentQuestionNumber();
  };

  onShuffleClick = () => {
    shuffleCards(this.state.cards);
  };

  onshowAllQuestionsClick = e => {
    this.setState(prevState => ({
      showAllQuestions: !prevState.showAllQuestions
    }));
  };
  onLastQuestionClick = e => {
    const currentQuestionNumber = this.state.currentQuestionNumber;
    if (currentQuestionNumber <= 0) {
      this.setState({
        currentQuestionNumber: this.state.cards.length - 1
      });
    } else {
      this.setState(prevState => ({
        currentQuestionNumber: prevState.currentQuestionNumber - 1
      }));
    }
    this.setState({
      rightBtnClicked: false,
      leftBtnClicked: true
    });
  };
  onNextQuestionClick = e => {
    this.setState(prevState => ({
      currentQuestionNumber:
        (prevState.currentQuestionNumber + 1) % this.state.cards.length,
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

  onLoginClick = e => {
    this.setState({
      logged: true
    });
  };
  onAddQuestionClick = e => {
    this.setState({
      creatingNewCard: true
    });
  };

  onSubmit = (question, answer, id) => {
    const newCard = {
      question,
      answer,
      id
    };
    // var newCards = this.state.cards.concat(NewCard);
    this.setState(prevState => ({
      cards: prevState.cards.concat(newCard)
    }));
    this.onCancelClick();
  };
  onCancelClick = e => {
    this.setState({
      creatingNewCard: false
    });
  };
  onStartClick = e => {
    this.setState(prevState => ({
      playing: !prevState.playing
    }));
  };
  // Hotkeys
  handleKeyDown = e => {
    if (this.state.playing) {
      switch (e.keyCode) {
        case RIGHTARROW:
          this.onNextQuestionClick(e);
          break;
        case LEFTARROW:
          this.onLastQuestionClick(e);
          break;
        default:
          break;
      }
    }
  };
  onTestModeClickTrue = e => {
    this.setState({
      testingMode: true
    });
  };
  onTestModeClickFalse = e => {
    this.setState({
      testingMode: false
    });
  };
  onCorrectAnswerClick = e => {
    this.setState(prevState => ({
      correct: prevState.correct + 1
    }));
  };

  getUserData = () => {
    fetch("/check", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      Vary: "Cookie"
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          logged: true
        });
        this.getCards();
      } else {
        this.setState({
          logged: false
        });
      }
    });
  };

  getCards = () => {
    fetch("/cards", {
      method: "GET",
      vary: "cookie"
    })
      .then(res => res.json())
      .then(json =>
        json.map(card => {
          var newCard = {
            question: card.question,
            answer: card.answer,
            id: uuid()
          };
          this.setState({
            cards: this.state.cards.concat(newCard)
          });
        })
      );
  };

  handleLogoutClick = e => {
    logout();
    setTimeout(() => {
      this.getUserData();
    }, 1000);
  };

  componentDidUpdate = (prevProps, prevState) => {};

  componentDidMount = () => {
    console.log("mounted");
    this.getUserData();
  };

  render() {
    const cardsInOrder = this.state.cards;
    const {
      showAllQuestions,
      currentQuestionNumber,
      darkMode,
      playing,
      creatingNewCard,
      correct,
      testingMode,
      logged
    } = this.state;
    const style = switchMode(darkMode); // style changes as this.state.darkMode changes value
    return (
      <div tabIndex="0" className={darkMode ? "dark-mode" : "light-mode"}>
        <SuccessMessage show={true} message={"SUCCESS"} />
        <div>
          <button className={style.btn} onClick={this.onModeClick}>
            Light mode / Dark mode
          </button>
          {showAllQuestions ? (
            <button
              className={style.btn}
              onClick={this.onshowAllQuestionsClick}
            >
              Hide all questions
            </button>
          ) : (
            <button
              className={style.btn}
              onClick={this.onshowAllQuestionsClick}
            >
              Show all questions
            </button>
          )}
          <button className={style.btn} onClick={this.handleShuffleClick}>
            Shuffle
          </button>
          <button onClick={this.onAddQuestionClick} className={style.btn}>
            Add Question
          </button>
          {logged && (
            <button onClick={this.handleLogoutClick} className={style.btn}>
              Logout
            </button>
          )}
        </div>

        <LoginForm
          getUserData={this.getUserData}
          onLoginClick={this.onLoginClick}
        />

        {creatingNewCard && (
          <EditableNewCard
            style={style.card}
            onSubmit={this.onSubmit}
            onCancelClick={this.onCancelClick}
          />
        )}
        {showAllQuestions && (
          <QuestionList
            cardsInOrder={cardsInOrder}
            onEditSubmit={this.onEditSubmit}
          />
        )}

        {playing ? (
          <div
            className="margin-auto-center"
            tabIndex="0"
            onKeyDown={this.handleKeyDown}
          >
            {/* Needs to fix this. Stop button not position correctly */}
            <button
              className={style.btn + " btn--start"}
              onClick={this.onStartClick}
            >
              Take a break
            </button>
            :
            <CurrentCard
              question={this.state.cards[currentQuestionNumber].question}
              answer={this.state.cards[currentQuestionNumber].answer}
              style={style.card}
              currentQuestionNumber={currentQuestionNumber}
              testingMode={this.state.testingMode}
              length={this.state.cards.length}
              onTestModeClickFalse={this.onTestModeClickFalse}
              onTestModeClickTrue={this.onTestModeClickTrue}
              onCorrectAnswerClick={this.onCorrectAnswerClick}
              onNextQuestionClick={this.onNextQuestionClick}
              onCloseSuccessMessageClick={this.onCloseSuccessMessageClick}
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
            {playing && testingMode && (
              <Slide correct={correct} length={this.state.cards.length} />
            )}
          </div>
        ) : (
          <button
            className={style.btn + " btn--start"}
            onClick={this.onStartClick}
          >
            Start Studying
          </button>
        )}
      </div>
    );
  }
}
