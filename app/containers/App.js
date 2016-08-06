import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
        {this.props.children}
      </div>
    );
  }
}
