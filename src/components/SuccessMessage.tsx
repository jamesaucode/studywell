import multiply from "../image/multiply.png";
import React, { SFC, MouseEvent } from "react";

type Props = {
  message: string;
  show: boolean;
};
const SuccessMessage: SFC<Props> = ({ message, show }) => {
  return show ? (
    <div className="success">
      <h1 className="success-message">{message}</h1>
      <img
        src={multiply}
        alt="button for closing the message"
        className="sixteen-px"
      />
    </div>
  ) : null;
};

export default SuccessMessage;
