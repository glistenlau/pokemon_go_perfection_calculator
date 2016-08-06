import {
  LOAD_USER,
  LOAD_USER_POKEMON_LIST,
} from '../actions/perfection';

const defaultState = {
  user: {}
};

const perfection = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_USER: {
      return Object.assign({}, state, {
        user: action.user,
      });
    }

    case LOAD_USER_POKEMON_LIST: {
      const user = Object.assign({}, state.user, {
        pokemonList: action.pokemonList,
      });

      return Object.assign({}, state, {
        user,
      });
    }

    default: {
      return state;
    }
  }
};

export default perfection;
