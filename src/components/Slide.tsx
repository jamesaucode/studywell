import React, { SFC } from "react";

type Props = { correct: number; length: number };

const Slide: SFC<Props> = ({ correct, length }) => {
  return (
    <div className="slide-wrapper">
      <input
        className="slide"
        type="range"
        min="0"
        value={correct}
        max={length}
      />
      <h2 className="slide-text">
        Correct Answer: {correct} / {length}{" "}
      </h2>
    </div>
  );
};

export default Slide;
