import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { INSTANCE_LOCATOR, TOKEN_PROVIDER, ROOM_ID } from '../config';

import MessageList from './MessageList';
import Input from './Input';

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentRoom: { users: [] },
      messages: [],
      users: []
    };
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: INSTANCE_LOCATOR,
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: TOKEN_PROVIDER
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser: currentUser });
        return currentUser.subscribeToRoom({
          roomId: ROOM_ID,
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({
          currentRoom,
          users: currentRoom.userIds
        });
      })
      .catch(error => console.log(error));
  }

  addMessage = text => {
    this.state.currentUser
      .sendMessage({
        text,
        roomId: this.state.currentRoom.id
      })
      .catch(error => console.error('error', error));
  };
  render() {
    return (
      <div>
        <h2 className="header">Let's Talk</h2>
        <MessageList messages={this.state.messages} />
        <Input className="input-field" onSubmit={this.addMessage} />
      </div>
    );
  }
}

export default ChatApp;
