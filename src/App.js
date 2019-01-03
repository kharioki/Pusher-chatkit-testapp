import React, { Component } from 'react';
import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';

import { INSTANCE_LOCATOR, SECRET_KEY } from './config';

import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit({
  instanceLocator: INSTANCE_LOCATOR,
  key: SECRET_KEY
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentId: '',
      currentView: 'signup'
    };
  }

  createUser = username => {
    chatkit
      .createUser({
        id: username,
        name: username
      })
      .then(currentUser => {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        });
      })
      .catch(err => {
        if (err.status === 400) {
          this.setState({
            currentUsername: username,
            currentId: username,
            currentView: 'chatApp'
          });
        } else {
          console.log(err.status);
        }
      });
  };

  changeView = view => {
    this.setState({
      currentView: view
    });
  };

  render() {
    let view = '';

    if (this.state.currentView === 'ChatMessage') {
      view = <ChatMessage changeView={this.changeView} />;
    } else if (this.state.currentView === 'signup') {
      view = <Signup onSubmit={this.createUser} />;
    } else if (this.state.currentView === 'chatApp') {
      view = <ChatApp currentId={this.state.currentId} />;
    }
    return <div className="App">{view}</div>;
  }
}
export default App;
