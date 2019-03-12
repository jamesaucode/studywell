import React, { MouseEvent, SFC } from "react";

type Props = {
  name: string;
  style: object;
  clicked: boolean;
  onClick(e: MouseEvent<HTMLElement>): void;
};
const Button: SFC<Props> = ({ name, style, clicked, onClick }) => {
  if (clicked) {
    return (
      <button onClick={onClick} className={style["btnL"] + " btn--big"}>
        {name}
      </button>
    );
  } else {
    return (
      <button className={style["btnN"] + " btn--big"} onClick={onClick}>
        {name}
      </button>
    );
  }
};

export default Button;
