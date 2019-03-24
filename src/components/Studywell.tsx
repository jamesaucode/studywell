import React, {Component, MouseEvent} from 'react';
import uuid from 'uuid';
import Slide from './Slide';
import EditableNewCard from './EditableNewCard';
import CurrentCard from './CurrentCard';
import QuestionList from './QuestionList';
import SuccessMessage from './SuccessMessage';
import FailMessage from './FailMessage';
import {logout, shuffleCards} from '../helpers/helper';
import Controls from './Controls';

'use strict';

const RIGHTARROW = 39;
const LEFTARROW = 37;
const initialState = {
  // Dummy data for testing
  cards: [
    {
      question: 'How do I use this website?',
      answer: 'Try clicking add question!',
      uuid: uuid(),
    },
  ],
  darkMode: true,
  playing: false,
  creatingNewCard: false,
  testingMode: false,
  message: '',
  failMessage: '',
  success: false,
  fail: false,
  correct: 0,
  currentQuestionNumber: 0,
};

type State = Readonly<typeof initialState>;
type Props = {
  style: object;
  logged: boolean;
  showQuestionList: boolean;
  creatingNewCard: boolean;
  onCreateNewCardclick: (event: MouseEvent) => void;
  toggleShowQuestionList: Function;
  onShowQuestionListClick: (event: MouseEvent) => void;
};

export default class StudyWell extends Component<Props, State> {
  readonly state = initialState;

  componentDidUpdate = (prevProps, prevState) => {};

  componentDidMount = () => {
    console.log('mounted');
    this.getUserData();
  };

  render() {
    const cardsInOrder = this.state.cards;
    const {
      currentQuestionNumber,
      darkMode,
      playing,
      correct,
      testingMode,
      success,
      fail,
    } = this.state;
    const {
      style,
      logged,
      showQuestionList,
      creatingNewCard,
      onCreateNewCardclick,
      toggleShowQuestionList,
      onShowQuestionListClick,
    } = this.props;
    // style changes as this.state.darkMode changes value
    return (
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        {success ? (
          <SuccessMessage
            show={true}
            message={this.state.message}
            hideSuccessMessage={this.hideSuccess}
          />
        ) : null}
        {fail ? (
          <FailMessage
            message={this.state.failMessage}
            hideFailMessage={this.hideFail}
          />
        ) : null}
        {creatingNewCard && (
          <EditableNewCard
            style={style['card']}
            onSubmit={this.onSubmit}
            onCancelClick={onCreateNewCardclick}
          />
        )}
        {showQuestionList && (
          <QuestionList
            cardsInOrder={cardsInOrder}
            onEditSubmit={this.onEditSubmit}
            onShowQuestionListClick={onShowQuestionListClick}
            onDeleteItem={this.onDeleteItem}
          />
        )}
        {!playing && logged ? (
          <button
            className={style['btn'] + ' btn--start'}
            onClick={this.onStartClick}>
            Start Studying
          </button>
        ) : null}
        {!logged && !playing ? (
          <a href="/login" className={style['btn'] + ' btn--start'}>
            Login / Register
          </a>
        ) : null}
        {playing && (
          <div
            className="margin-auto-center"
            onKeyDown={this.handleKeyDown}
            tabIndex={0}>
            <CurrentCard
              question={this.state.cards[currentQuestionNumber].question}
              answer={this.state.cards[currentQuestionNumber].answer}
              style={style['card']}
              currentQuestionNumber={currentQuestionNumber}
              testingMode={this.state.testingMode}
              length={this.state.cards.length}
              onTestModeClickFalse={this.onTestModeClickFalse}
              onTestModeClickTrue={this.onTestModeClickTrue}
              onCorrectAnswerClick={this.onCorrectAnswerClick}
              onNextQuestionClick={this.onNextQuestionClick}
            />
            {playing && testingMode && (
              <Slide correct={correct} length={this.state.cards.length} />
            )}
            {playing && logged ? (
              <Controls
                onStartClick={this.onStartClick}
                onAddQuestionClick={this.onAddQuestionClick}
                onNextQuestionClick={this.onNextQuestionClick}
                onLastQuestionClick={this.onLastQuestionClick}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }

  private resetCurrentQuestionNumber = () => {
    this.setState({
      currentQuestionNumber: 0,
    });
  };

  private handleShuffleClick = () => {
    this.onShuffleClick();
    this.resetCurrentQuestionNumber();
  };

  private onShuffleClick = () => {
    shuffleCards(this.state.cards);
  };

  private onLastQuestionClick = e => {
    const currentQuestionNumber = this.state.currentQuestionNumber;
    if (currentQuestionNumber <= 0) {
      this.setState({
        currentQuestionNumber: this.state.cards.length - 1,
      });
    } else {
      this.setState(prevState => ({
        currentQuestionNumber: prevState.currentQuestionNumber - 1,
      }));
    }
  };
  private onNextQuestionClick = e => {
    this.setState(prevState => ({
      currentQuestionNumber:
        (prevState.currentQuestionNumber + 1) % this.state.cards.length,
    }));
  };
  private onDeleteItem = uuid => {
    const cards = this.state.cards;
    cards.map(card => {
      if (uuid === card.uuid) {
        cards.splice(cards.indexOf(card), 1);
        this.flashSuccessMessage(
          'Question: ' + card.question + ' has been deleted.',
        );
      }
    });
    this.setState({
      cards,
    });
  };

  private onEditSubmit = ({
    question: oldQuestion,
    answer: oldAnswer,
    uuid: oldUuid,
  }) => {
    fetch('/cards', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: oldQuestion,
        answer: oldAnswer,
        uuid: oldUuid,
      }),
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Could not handle the submit request.');
        }
      })
      .then(
        json => {
          const {question, answer, uuid, message} = json;
          const cards = this.state.cards;
          cards.map(card => {
            if (oldUuid === card.uuid) {
              card['answer'] = answer;
              card['question'] = question;
            }
          });
          this.setState({
            cards,
          });
          this.flashSuccessMessage(message);
        },
        error => {
          this.flashFailMessage(error.message);
        },
      );
  };

  private onAddQuestionClick = e => {
    this.setState({
      creatingNewCard: true,
    });
  };

  private onSubmit = (question, answer, uuid) => {
    fetch('/cards', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
        answer: answer,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Could not handle the submit request.');
        }
      })
      .then(
        json => {
          const {question, answer, uuid, message} = json;
          const newCard = {
            question,
            answer,
            uuid,
          };
          this.setState(prevState => ({
            cards: prevState.cards.concat(newCard),
          }));
          this.flashSuccessMessage(message);
        },
        error => {
          console.error(error.message);
        },
      );
    this.props.toggleShowQuestionList();
  };
  private onCancelClick = () => {
    this.setState({
      creatingNewCard: false,
    });
  };
  private onStartClick = () => {
    this.setState(prevState => ({
      playing: !prevState.playing,
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
      testingMode: true,
    });
  };
  private onTestModeClickFalse = e => {
    this.setState({
      testingMode: false,
    });
  };
  private onCorrectAnswerClick = () => {
    this.setState(incrementCorrect);
  };

  private hideSuccess = () => {
    this.setState(hideSuccessMessage);
  };
  private hideFail = () => {
    this.setState(hideFailMessage);
  };
  private flashSuccessMessage = (message: string) => {
    this.setState({
      success: false,
    });
    this.setState(showSuccessMessage(message));
  };
  private flashFailMessage = (message: string) => {
    this.setState({
      fail: false,
    });
    this.setState(showFailMessage(message));
  };

  private getUserData = () => {
    fetch('/check').then(res => {
      if (res.status === 200) {
        this.getCards();
      }
    });
  };

  private getCards = () => {
    fetch('/cards', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json =>
        json.map(card => {
          const newCard = {
            question: card.question,
            answer: card.answer,
            uuid: card.uuid,
          };
          this.setState({
            cards: this.state.cards.concat(newCard),
          });
        }),
      );
  };
}

const incrementCorrect = (prevState: State) => ({
  correct: prevState.correct + 1,
});
const showSuccessMessage = (message: string) => ({
  success: true,
  message: message,
});
const hideSuccessMessage = (prevState: State) => ({
  success: false,
});
const showFailMessage = (message: string) => ({
  fail: true,
  failMessage: message,
});
const hideFailMessage = (prevState: State) => ({
  fail: false,
});
