import React, { Component } from "react";
import uuid from "uuid";
import Button from "./Button";
import Slide from "./Slide";
import EditableNewCard from "./EditableNewCard";
import CurrentCard from "./CurrentCard";
import QuestionList from "./QuestionList";
import { logout, shuffleCards } from "../helpers/helper";

const RIGHTARROW = 39;
const LEFTARROW = 37;
const initialState = {
  // Dummy data for testing
  cards: [
    {
      question: "Test question 1",
      answer: "Answer 1",
      uuid: uuid()
    },
    {
      question: "Test question 2",
      answer: "Answer 2",
      uuid: uuid()
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

type State = Readonly<typeof initialState>;
type Props = { style: object; logged: boolean };

export default class StudyWell extends Component<Props, State> {
  readonly state = initialState;

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
      testingMode
    } = this.state;
    const { style } = this.props; // style changes as this.state.darkMode changes value
    return (
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        {creatingNewCard && (
          <EditableNewCard
            style={style["card"]}
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
          <div className="margin-auto-center" onKeyDown={this.handleKeyDown}>
            {/* Needs to fix this. Stop button not position correctly */}
            <button
              className={style["btn"] + " btn--start"}
              onClick={this.onStartClick}
            >
              Take a break
            </button>
            :
            <CurrentCard
              question={this.state.cards[currentQuestionNumber].question}
              answer={this.state.cards[currentQuestionNumber].answer}
              style={style["card"]}
              currentQuestionNumber={currentQuestionNumber}
              testingMode={this.state.testingMode}
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
            {playing && testingMode && (
              <Slide correct={correct} length={this.state.cards.length} />
            )}
          </div>
        ) : (
          <button
            className={style["btn"] + " btn--start"}
            onClick={this.onStartClick}
          >
            Start Studying
          </button>
        )}
      </div>
    );
  }

  private resetCurrentQuestionNumber = () => {
    this.setState({
      currentQuestionNumber: 0
    });
  };

  private handleShuffleClick = () => {
    this.onShuffleClick();
    this.resetCurrentQuestionNumber();
  };

  private onShuffleClick = () => {
    shuffleCards(this.state.cards);
  };

  private onshowAllQuestionsClick = e => {
    this.setState(prevState => ({
      showAllQuestions: !prevState.showAllQuestions
    }));
  };
  private onLastQuestionClick = e => {
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
  private onNextQuestionClick = e => {
    this.setState(prevState => ({
      currentQuestionNumber:
        (prevState.currentQuestionNumber + 1) % this.state.cards.length,
      rightBtnClicked: true,
      leftBtnClicked: false
    }));
  };

  private onEditSubmit = ({ question, answer, uuid }) => {
    this.setState({
      cards: this.state.cards.map(card => {
        if (uuid === card.uuid) {
          return Object.assign({}, card, {
            question,
            answer,
            uuid
          });
        } else {
          return card;
        }
      })
    });
  };

  private onAddQuestionClick = e => {
    this.setState({
      creatingNewCard: true
    });
  };

  private onSubmit = (question, answer, uuid) => {
    fetch("/cards", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question,
        answer: answer
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Could not handle the submit request.");
        }
      })
      .then(
        json => {
          const { question, answer, uuid } = json;
          const newCard = {
            question,
            answer,
            uuid
          };
          this.setState(prevState => ({
            cards: prevState.cards.concat(newCard)
          }));
        },
        error => {
          console.error(error.message);
        }
      );
    this.onCancelClick();
  };
  private onCancelClick = () => {
    this.setState({
      creatingNewCard: false
    });
  };
  private onStartClick = e => {
    this.setState(prevState => ({
      playing: !prevState.playing
    }));
  };
  // Hotkeys
  private handleKeyDown = e => {
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
  private onTestModeClickTrue = e => {
    this.setState({
      testingMode: true
    });
  };
  private onTestModeClickFalse = e => {
    this.setState({
      testingMode: false
    });
  };
  private onCorrectAnswerClick = () => {
    this.setState(incrementCorrect);
  };

  private getUserData = () => {
    fetch("/check").then(res => {
      if (res.status === 200) {
        this.getCards();
      }
    });
  };

  private getCards = () => {
    fetch("/cards", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json =>
        json.map(card => {
          const newCard = {
            question: card.question,
            answer: card.answer,
            uuid: uuid()
          };
          this.setState({
            cards: this.state.cards.concat(newCard)
          });
        })
      );
  };
}

const incrementCorrect = (prevState: State) => ({
  correct: prevState.correct + 1
});
