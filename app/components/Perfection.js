import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Perfection.css';
import { refreshPokemonList } from '../actions/perfection';

class Perfection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.handleClickRefresh = this.handleClickRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.pokemonList !== this.props.user.pokemonList) {
      if (this.state.isLoading) {
        setTimeout(() => {
          this.setState({
            isLoading: false,
          });
        });
      }
    }
  }

  handleClickRefresh() {
    const { dispatch, user } = this.props;

    this.setState({
      isLoading: true,
    });
    dispatch(refreshPokemonList(user));
  }

  render() {
    const { user } = this.props;
    const { isLoading } = this.state;

    return (
        <div
          style={{ display: 'flex', flexDirection: 'column', margin: 56 }}
        >
          <div>
          <button
            className={isLoading ? styles.refresh : undefined}
            type="button"
            style={{ backgroundColor: 'transparent', border: 0, padding: 0 }}
            onClick={this.handleClickRefresh}
          >
            <i
              className="material-icons"
              style={{ color: '#ffffff', fontSize: 24 }}
            >
              refresh
            </i>
          </button>
          </div>


          <div style={{ display: 'flex', flex: 1, overflow: 'auto' }} >
          <table
            className={styles.table}
            style={{
              color: 'rgba(0, 0, 0, .87)',
              backgroundColor: 'white',
            }}
          >
            <thead>
            <tr
              className={styles.tableHeader}
              style={{ color: 'rgba(0, 0, 0, .54)', height: 56, textAlign: 'left' }}
            >
              <th
                style={{ paddingLeft: 24, paddingRight: 24 }}
              >Pokemon</th>
              <th
                style={{ paddingRight: 24 }}
              >梦可宝</th>
              <th
                style={{ paddingRight: 56 }}
              >CP</th>
              <th
                style={{ paddingRight: 56 }}
              >Perfect CP</th>
              <th
                style={{ paddingRight: 56 }}
              >CP Perfection</th>
              <th
                style={{ paddingRight: 56 }}
              >ATK</th>
              <th
                style={{ paddingRight: 56 }}
              >DEF</th>
              <th
                style={{ paddingRight: 56 }}
              >STA</th>
              <th
                style={{ paddingRight: 24 }}
              >IV Perfection</th>
            </tr>
            </thead>
            <tbody>
            {
              user.pokemonList.map((pokemon) => {
                return (
                  <tr
                    className={styles.tableData}
                    key={pokemon.id}
                    style={{
                      border: '1px solid rbga(0, 0, 0, .15)',
                      height: 48,
                      textAlign: 'right',
                    }}
                  >
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingLeft: 24, textAlign: 'left', paddingRight: 24 }}
                    >{pokemon.name}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', textAlign: 'left', paddingRight: 24 }}
                    >{pokemon.zhName}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingRight: 56 }}
                    >{pokemon.curCP}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingRight: 56 }}
                    >{pokemon.maxCP}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingRight: 56 }}
                    >{`${Math.round(pokemon.CPPerfection * 100) / 100} %`}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingRight: 56 }}
                    >{pokemon.individualATK}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingRight: 56 }}
                    >{pokemon.individualDEF}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingRight: 56 }}
                    >{pokemon.individualSTA}</td>
                    <td
                      style={{ border: '1px solid rbga(0, 0, 0, .15)', paddingRight: 24 }}
                    >{`${Math.round(pokemon.IVPerfection * 100) / 100} %`}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Perfection;
