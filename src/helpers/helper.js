const logout = e => {
  fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    Vary: "Cookie"
  }).then(res => res.status);
};

const shuffleCards = cards => {
  var j, x, i;
  for (i = cards.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = cards[i];
    cards[i] = cards[j];
    cards[j] = x;
  }
  return cards;
};

const switchMode = StateDarkMode => {
  if (StateDarkMode) {
    const style = {
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
    return style;
  } else {
    const style = {
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

    return style;
  }
};

export { logout, switchMode, shuffleCards };
