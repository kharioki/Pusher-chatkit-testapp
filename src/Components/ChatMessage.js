import React, { Component } from 'react';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
  }

  changeView = () => {
    this.props.changeView('signup');
  };
  render() {
    return (
      <div>
        <button className="chat-button" onClick={this.changeView}>
          Send a message
        </button>
      </div>
    );
  }
}
export default ChatMessage;
