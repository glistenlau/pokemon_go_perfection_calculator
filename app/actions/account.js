import PokemonGO from 'pokemon-go-node-api';
import { loadUser } from './perfection';
import Pokemon from '../pokemon';

export const fetchPokemonList = (poke) => new Promise((resolve, reject) => {
  setTimeout(() => {
    poke.GetInventory((err, inventory) => {
      if (err) {
        reject(err);
      }

      const pokemonList = inventory.inventory_delta.inventory_items
        .filter((item) => {
          const { pokemon } = item.inventory_item_data;

          return pokemon !== null && pokemon.pokemon_id > 0;
        })
        .map((item) => {
          const { pokemon } = item.inventory_item_data;

          return new Pokemon(pokemon);
        })
        .sort((p1, p2) => p2.IVPerfection - p1.IVPerfection);

      resolve(pokemonList);
    });
  }, 500);
});

export const fetchProfile = (poke) => new Promise((resolve, reject) => {
  setTimeout(() => {
    poke.GetProfile((err, profile) => {
      if (err) {
        reject(err);
      }

      resolve(profile);
    });
  }, 500);
});

export const login = (username, password, location, provider) => new Promise((resolve, reject) => {
  const poke = new PokemonGO.Pokeio();

  poke.init(username, password, location, provider, (error) => {
    if (error) {
      reject(error);
    }

    resolve(poke);
  });
});

export const getUser = (username, password, location, provider, routeFunc) => (dispatch) => {
  let user;

  login(username, password, location, provider)
    .then((poke) => {
      user = Object.assign({}, {
        poke,
        playerInfo: poke.playerInfo,
      });

      return poke;
    })
    .then(fetchProfile)
    .then((profile) => {
      user = Object.assign({}, user, {
        username: profile.username,
      });

      return user.poke;
    })
    .then(fetchPokemonList)
    .then((pokemonList) => {
      user = Object.assign({}, user, {
        pokemonList,
      });

      dispatch(loadUser(user));
    })
    .then(() => {
      routeFunc();
    })
    .catch((error) => {
      console.warn(error);
    });
};
