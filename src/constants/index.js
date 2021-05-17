//Base URL
const base_url = "https://pokeapi.co/api/v2/";

// Pokemon names
const query_pokemons = `pokemon`;
// Pokemon by Name

//Abilities

//Characteritics

// Routes
export const getPokemonNames = () => `${base_url}${query_pokemons}`;
export const getPokemonByName = (pokemonName) =>
  `${base_url}${query_pokemons}/${pokemonName}`;
