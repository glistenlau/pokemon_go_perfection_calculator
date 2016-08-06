import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PerfectionPage from './containers/PerfectionPage';


export default (
  <Route style={{ display: 'flex', flex: 1, justifyContent: 'center' }} path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/counter" component={PerfectionPage} />
  </Route>
);
