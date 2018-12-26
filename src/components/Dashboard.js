import React, { Component } from "react";
import Card from "./Card";
import uuid from 'uuid';
import CurrentCard from "./CurrentCard";
import QuestionList from "./QuestionList";

export default class Dashboard extends Component {
  state = {
    cards: [
      {
        question: "Pseudocode",
        answer: "a high-level description of the actions of a program or algorithm, using a mixture of English and informal programming language syntax",
        i: 1,
        id: uuid()
      },
      {
        question: "Algorithm",
        answer: "a step-by-step procedure for solving a problem",
        i: 2,
        id: uuid()
      },
      {
        question: "Flowchart",
        answer: "a diagram that shows step-by-step progression through a procedure using connecting lines and a set of symbols",
        i: 3,
        id: uuid()
      },
      {
        question: "program",
        answer: "provide a computer or other machine with coded instructions for the automatic performance of a particular task",
        i: 4,
        id: uuid()
      },
      {
        question: "Your mom?",
        answer: "Fat",
        i: 5,
        id: uuid()
      }
    ],
    // cardsRandomOrder: [
    //   {
    //     question: "Question 1",
    //     answer: "Yes!"
    //   },
    //   {
    //     question: "Yes or no",
    //     answer: "hell no.."
    //   },
    //   {
    //     question: "LUL",
    //     answer: "Maybe"
    //   },
    //   {
    //     question: "Another question",
    //     answer: "I have"
    //   },
    //   {
    //     question: "Slim?",
    //     answer: "Fat"
    //   }
    // ],
    current: {},
    darkMode: true,
    collapse: false,
    qnum: 0
  };
  onDrawClick = e => {
    const cards = this.state.cards;
    const randomNumber = Math.floor(
      Math.random(cards.length) * Math.floor(cards.length)
    );
    console.log(randomNumber);
    this.setState({
      current: cards[randomNumber]
    });
  };
  handleShuffleClick = () => {
    this.onShuffleClick();
    this.setState({
      qnum: 0
    });
  };
  onShuffleClick = () => {
    console.log("Everyday I am shuffling");
    var cards = this.state.cards
    var j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = cards[i];
      cards[i] = cards[j];
      cards[j] = x;
    }
    this.setState({
      cardsRandomOrder: cards
    });
  };
  onCollapseClick = e => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };
  onLastQuestionClick = e => {
    const qnum = this.state.qnum;
    if (qnum <= 0) {
      return;
    } else {
      this.setState(prevState => ({
        qnum: prevState.qnum - 1
      }));
    }
  };
  onNextQuestionClick = e => {
    this.setState(prevState => ({
      qnum: (prevState.qnum + 1) % this.state.cards.length
    }));
  };
  onModeClick = e => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  };
  onEditSubmit = ({question, answer, id}) => {
    console.log(question, answer, id)
    this.setState({
      cards : this.state.cards.map((card) => {
        console.log(card)
        if (id === card.id) {
          return Object.assign({}, card, {
            question,
            answer,
            id
          })
        } else {
          return card
        }
      })})
  }
  render() {
    const cardsInOrder = this.state.cards;
    const cardsRandomOrder = this.state.cardsRandomOrder;
    const { collapse, qnum, darkMode } = this.state;
    var darkModeString = "dark-mode";
    var style = {};
    if (!darkMode) {
      darkModeString = "light-mode";
      style = {
        btn: "btn--light",
        btnLong: "btn--long",
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
        btn: "btn--dark",
        btnLong: "btn--long",
        cards: "cards--dark",
        card: {
          div: "card--dark",
          question: "question--dark",
          answer: "answer--dark"
        }
      };
    }
    return (
      <div className={darkModeString}>
        <button className={style.btn} onClick={this.onModeClick}>
          Light mode / Dark mode
        </button>
        <button className={style.btn} onClick={this.onCollapseClick}>
          Show all questions
        </button>
        <button className={style.btn} onClick={this.handleShuffleClick}>
          Shuffle
        </button>
        {collapse && (
            <QuestionList
            cardsInOrder={cardsInOrder}
            onEditSubmit={this.onEditSubmit}
            />
        )}
        <CurrentCard
          question={this.state.cards[qnum].question}
          answer={this.state.cards[qnum].answer}
          style={style.card}
          qnum={qnum}
        />
        <div className="btns">
        <button className={style.btn + " btn--big"} onClick={this.onLastQuestionClick}>
        &#8592; Previous
        </button>
        <button className={style.btn + " btn--big"} onClick={this.onNextQuestionClick}>
          Next &#8594;
        </button>
        </div>
      </div>
    );
  }
}
