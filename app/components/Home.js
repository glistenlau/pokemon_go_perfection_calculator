import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

// var Pokeio = require('pokemon-go-node-api')


import AccoundLogin from './AccountLogin';


export default class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    return (
      <div className={styles.container}>
        <div style={{ alignItems: 'center', display: 'flex', flex: 1 }}>
          <h2>Pokemon Perfection Calculator</h2>
        </div>
        <AccoundLogin />
      </div>
    );
  }
}
