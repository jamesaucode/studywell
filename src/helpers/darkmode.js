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

export { switchMode };
