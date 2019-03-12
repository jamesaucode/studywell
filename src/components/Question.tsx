import React, { SFC } from "react";

type Props = { question: string; answer: string };

const Question: SFC<Props> = ({ question, answer }) => {
  return (
    <div className="small-title">
      <p className="tiny-title">{question}</p>
      <p className="tiny-text">Ans: {answer}</p>
    </div>
  );
};

export default Question;
