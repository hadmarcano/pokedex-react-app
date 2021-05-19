//Base URL
const base_url = "https://pokeapi.co/api/v2/";

// Pokemon all names
const query_pokemons = `pokemon/?limit=15`;
// Pokemon by name
const query_pokemon = `pokemon`;
// All type of pokemons
const query_types = `type?limit=10`;
// Type by pokemon
const query_type = `type`;
//Abilities

//Characteritics

// Routes
export const getPokemonNames = () => `${base_url}${query_pokemons}`;
export const getPokemonByName = (pokemonName) =>
  `${base_url}${query_pokemon}/${pokemonName}`;
export const getTypeOfPokemons = () => `${base_url}/${query_types}`;
export const getTypeDetailByType = (type) => `${base_url}${query_type}/${type}`;
