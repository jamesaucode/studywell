import multiply from '../image/multiply.png';
import React, {Component, SFC, MouseEvent} from 'react';

'use strict';

type Props = {
  message: string;
  show: boolean;
  hideSuccessMessage: Function;
};
export default class SuccessMessage extends Component<Props, Object> {
  componentDidMount = () => {
      console.log('SucessMessage mounted');
    setTimeout(() => {
       console.log('Hiding!');
      this.props.hideSuccessMessage();
    }, 5000);
  };
  render() {
    const {show, message} = this.props;
    return show ? (
      <div className="message message-success">
        <h1 className="message-heading">SUCCESS!</h1>
        <h2 className="message-message">{message}</h2>
        {/* <img
        src={multiply}
        alt="button for closing the message"
        className="sixteen-px"
      /> */}
      </div>
    ) : null;
  }
}
