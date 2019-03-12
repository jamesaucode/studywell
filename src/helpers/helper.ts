import { MouseEvent } from "react";

const logout = (e: MouseEvent) => {
  e.preventDefault();
  fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => res.status);
};

const shuffleCards = (cards: object[]) => {
  var j, x, i;
  for (i = cards.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = cards[i];
    cards[i] = cards[j];
    cards[j] = x;
  }
  return cards;
};

const isUserLoggedIn = () => {
  return fetch("/check").then(res => {
    return res;
  });
};

const switchMode = (StateDarkMode: boolean) => {
  return StateDarkMode
    ? {
        btnL: "btn--dark--next",
        btnN: "btn--dark--last",
        btn: "btn--dark",
        cards: "cards--dark",
        card: {
          div: "card--dark",
          question: "question--dark",
          answer: "answer--dark"
        }
      }
    : {
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
};

export { logout, switchMode, shuffleCards, isUserLoggedIn };
