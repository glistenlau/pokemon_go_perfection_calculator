import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './Home.css';
import { getUser } from '../actions/account';


class AccoundLogin extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      flash: false,
      latitude: '',
      loadingPosition: false,
      longitude: '',
      username: '',
      password: '',
    };

    this.handleChangeLatitude = this.handleChangeLatitude.bind(this);
    this.handleChangeLongitude = this.handleChangeLongitude.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleClickLocation = this.handleClickLocation.bind(this);
    this.handleClickGoogle = this.handleClickGoogle.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function success(position) {
      console.log('get Location: ', position);
    }, function error(error) {
        // never called
    });
  }

  handleChangeLatitude(event) {
    this.setState({ latitude: event.target.value });
  }

  handleChangeLongitude(event) {
    this.setState({ longitude: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleClickLocation() {
    if (this.state.loadingPosition) {
      return;
    }

    this.setState({
      loadingPosition: true,
    });
    const locationInterval = setInterval(() => {
      this.setState({
        flash: !this.state.flash,
      });
    }, 500);

    fetch('https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium&sensor=true')
      .then((response) => {
        return response.json();
      })
      .then((position) => {
        setTimeout(() => {
          clearInterval(locationInterval);
          this.setState({
            flash: false,
            latitude: position.location.lat,
            longitude: position.location.lng,
            loadingPosition: false,
          });
        }, 3000);
      })
      .catch((error) => {
        console.warn('get position error: ', error);
      });
  }

  handleClickGoogle() {
    const { dispatch } = this.props;
    const { latitude, longitude, username, password } = this.state;
    const { router } = this.context;

    const location = {
      type: 'coords',
      coords: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };

    const routeFunc = () => router.push('/counter');

    dispatch(getUser(username, password, location, 'google', routeFunc));
  }

  handleClickPTC() {
    const { dispatch } = this.props;
    const { latitude, longitude, username, password } = this.state;
    const { router } = this.context;

    const location = {
      type: 'coords',
      coords: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };

    const routeFunc = () => router.push('/counter');

    dispatch(getUser(username, password, location, 'ptc', routeFunc));
  }

  render() {
    const { username, password, latitude, flash, longitude } = this.state;

    return (
      <div
        style={{ alignItems: 'center', display: 'flex', flex: 2, flexDirection: 'column', }}
      >
        <div
          style={{ padding: 10 }}
        >
          <input
            style={{ borderWidth: 0, borderRadius: 2, fontSize: 16, height: 24, padding: 10, width: 300 }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.handleChangeUsername}
          />
        </div>
        <div
          style={{ padding: 10 }}
        >
          <input
            style={{ borderWidth: 0, borderRadius: 2, fontSize: 16, height: 24, padding: 10, width: 300 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChangePassword}
          />
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: 340 }}
        >
          <div
            style={{ display: 'flex', flex: 1, padding: 10 }}
          >
            <input
              style={{ borderWidth: 0, borderRadius: 2, fontSize: 16, height: 24, padding: 10, width: 108 }}
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={this.handleChangeLatitude}
            />
          </div>
          <div
            style={{ display: 'flex', flex: 1, padding: 10 }}
          >
            <input
              style={{ borderWidth: 0, borderRadius: 2, fontSize: 16, height: 24, padding: 10, width: 108 }}
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={this.handleChangeLongitude}
            />
          </div>
          <div
            style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', padding: 10, height: 44 }}
          >
            {!flash &&
              <button
                type="button"
                style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
                onClick={this.handleClickLocation}
              >
                <i
                  className="material-icons"
                  style={{ color: '#ffffff', fontSize: 24 }}
                >
                  my_location
                </i>
              </button>
            }
            {flash &&
              <i
                className="material-icons"
                style={{ color: '#ffffff', fontSize: 24 }}
              >
                location_searching
              </i>
            }
          </div>
        </div>

        <button type="button"
          style={{ backgroundColor: '#FF9800', borderWidth: 0, borderRadius: 2, color: '#fff', fontSize: 16, margin: 10, width: 300, height: 50 }}
          onClick={this.handleClickPTC}
        >
          Pokemon Trainer Club Login
        </button>
        <button type="button"
          style={{ backgroundColor: '#D32F2F', borderWidth: 0, borderRadius: 2, color: '#fff', fontSize: 16, margin: 10, width: 300, height: 50 }}
          onClick={this.handleClickGoogle.bind(this)}
        >
          Google Account Login
        </button>
      </div>
    );
  }
}

export default connect()(AccoundLogin);
