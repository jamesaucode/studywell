import React, {Component} from 'react';
'use strict'
type Props = {
    message: string;
    hideFailMessage : Function;
}
export default class FailMessage extends Component<Props, Object> {
    componentDidMount = () => {
        setTimeout(() => {
            this.props.hideFailMessage();
        }, 5000)
    }
    render() {
        const { message } = this.props;
        return (
            <div className="message message-fail">
                <h1 className="message-heading">FAILED</h1>
                <h2 className="message-message">{message}</h2>
            </div>
        );
    }
}
