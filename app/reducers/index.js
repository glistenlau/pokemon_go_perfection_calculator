import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import perfection from './perfection';

const rootReducer = combineReducers({
  perfection,
  routing
});

export default rootReducer;
