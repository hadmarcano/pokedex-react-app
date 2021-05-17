import React, { createContext, useState, useEffect } from "react";
import { getPokemonByName, getPokemonNames } from "../constants";

export const CharacterContext = createContext();

const PokemonContextProvider = ({ children }) => {
  const [doneFetchPokemon, setDoneFetchPokemon] = useState(false);
  const [pokemonDetail, setPokemonDetail] = useState({});
  const [currentQPokemon, setCurrentQPokemon] = useState("");

  //Life Cycle
  useEffect(() => {
    getPokemonDetails(currentQPokemon);
  }, [currentQPokemon]);

  // Fetchs
  const getPokemonDetails = (name) => {
    if (currentQPokemon.length > 0) {
      fetch(getPokemonByName(name))
        .then((res) => res.json())
        .then((data) => {
          setDoneFetchPokemon(true);
          console.log(data);
          setPokemonDetail(data);
        })
        .catch((error) => console.log(error));
    }
  };

  const changeCurrentQPokemon = (pokemon) => {
    setCurrentQPokemon(pokemon);
  };

  return (
    <CharacterContext.Provider
      value={{ changeCurrentQPokemon, pokemonDetail, currentQPokemon }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default PokemonContextProvider;
