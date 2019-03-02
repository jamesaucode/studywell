import React, { Component } from "react";
import uuid from "uuid";
import { switchMode } from "../helpers/darkmode";
import Button from "./Button";
import Slide from "./Slide";
import EditableNewCard from "./EditableNewCard";
import CurrentCard from "./CurrentCard";
import QuestionList from "./QuestionList";
import SuccessMessage from "./SuccessMessage";

export default class StudyWell extends Component {
  state = {
    // Dummy data for testing
    cards: [
      {
        question: "Test question 1",
        answer: "Answer 1",
        i: 1,
        id: uuid()
      },
      {
        question: "Test question 2",
        answer: "Answer 2",
        i: 2,
        id: uuid()
      }
    ],
    session: "5d65eb0e-6433-4d01-a381-c946a355e0cd",
    darkMode: true,
    leftBtnClicked: false,
    rightBtnClicked: false,
    showAllQuestions: false,
    playing: false,
    creatingNewCard: false,
    testingMode: false,
    success: false,
    message: "",
    correct: 0,
    currentQuestionNumber: 0
  };
  handleShuffleClick = () => {
    this.onShuffleClick();
    this.setState({
      currentQuestionNumber: 0,
      success: true,
      message: "Shuffled the questions!"
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
    // fetch("http://127.0.0.1:5000/" + this.state.session, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     question,
    //     answer,
    //     id,
    //     session: this.state.session
    //   })
    // });
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
      creatingNewCard: true
    });
  };

  onSubmit = (question, answer, id) => {
    const NewCard = {
      question,
      answer,
      id,
      i: this.state.cards.length + 1
    };
    var newCards = this.state.cards.concat(NewCard);
    this.setState(prevState => ({
      cards: newCards,
      success: true,
      message: "Question successfully added!"
    }));
    // fetch("http://127.0.0.1:5000/" + this.state.session, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     question,
    //     answer,
    //     id,
    //     session: this.state.session
    //   })
    // });
    // var api = "http://127.0.0.1:5000/" + this.state.session;
    // fetch(api)
    //   .then(res => res.json())
    //   .then(json =>
    //     this.setState({
    //       // Default setting the state to first list of the database
    //       cards: json
    //     })
    //   );
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
      const rightArrow = 39;
      const leftArrow = 37;
      switch (e.keyCode) {
        case rightArrow:
          this.onNextQuestionClick(e);
          break;
        case leftArrow:
          this.onLastQuestionClick(e);
          break;
        default:
          break;
      }
    }
  };
  onCloseSuccessMessageClick = e => {
    this.setState({
      success: false
    });
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

  componentDidUpdate = (prevProps, prevState) => {};

  componentDidMount = () => {
    console.log("Mounted!");
    var api = "http://127.0.0.1:5000/" + this.state.session;
    console.log(api);
    fetch(api)
      .then(res => res.json())
      .then(json =>
        this.setState({
          cards: json
        })
      );
    console.log("Your session no. is " + this.state.session);
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
    const style = switchMode(darkMode); // style changes as this.state.darkMode changes value
    return (
      <div
        tabIndex="0"
        // onKeyDown={this.onDimClickOff}
        className={darkMode ? "dark-mode" : "light-mode"}
      >
        {/* {this.state.dim && <div className="dimmer" />} */}
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
        </div>

        {/* Show success message for new card  */}
        {this.state.success && (
          <SuccessMessage
            message={this.state.message}
            onCloseSuccessMessageClick={this.onCloseSuccessMessageClick}
          />
        )}
        {creatingNewCard && (
          <EditableNewCard
            style={style.card}
            onSubmit={this.onSubmit}
            onCancelClick={this.onCancelClick}
            onCloseSuccessMessageClick={this.onCloseSuccessMessageClick}
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

// (
//   <button className={style.btn} onClick={this.onStartClick}>
//     Take a break
//   </button>
// ) :
