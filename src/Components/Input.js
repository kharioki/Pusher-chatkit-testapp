import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.message);
    this.setState({
      message: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input-field">
        <input
          className="message-input"
          type="text"
          onChange={this.handleChange}
          value={this.state.message}
        />
        <input className="message-submit" type="submit" value="send" />
      </form>
    );
  }
}
export default Input;
