import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import {
  INSTANCE_LOCATOR,
  TOKEN_PROVIDER,
  ROOM_ID,
  SECRET_KEY,
  KEY_SECRET
} from '../config';

import { default as Chatkit } from '@pusher/chatkit-server';
import jwt from 'jsonwebtoken';

import MessageList from './MessageList';
import Input from './Input';

var signOptions = {
  expiresIn: '12h'
};
const token = jwt.sign(
  { instance: INSTANCE_LOCATOR, iss: KEY_SECRET, sub: 'safari' },
  'safari',
  signOptions
);
const _token = jwt.decode(token);
console.log({ _token });

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
    // const chatManager = new ChatManager({
    //   instanceLocator: INSTANCE_LOCATOR,
    //   userId: this.props.currentId,
    //   tokenProvider: _token
    // });
    const chatManager = new ChatManager({
      instanceLocator: INSTANCE_LOCATOR,
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: 'http://localhost:3331/authenticate'
      })
    });
    console.log({ chatManager });
    chatManager
      .connect()
      .then(currentUser => {
        console.log({ currentUser });
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
