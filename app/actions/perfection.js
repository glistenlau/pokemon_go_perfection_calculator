import { fetchPokemonList } from './account';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_POKEMON_LIST = 'LOAD_USER_POKEMON_LIST';

export const loadUser = (user) => ({
  type: LOAD_USER,
  user,
});

export const loadUserPokemonList = (pokemonList) => ({
  type: LOAD_USER_POKEMON_LIST,
  pokemonList,
});

export const refreshPokemonList = (user) => (dispatch) => {
  fetchPokemonList(user.poke)
    .then((pokemonList) => {
      console.log('Got pokemon list: ', pokemonList);

      dispatch(loadUserPokemonList(pokemonList));
    });
};
