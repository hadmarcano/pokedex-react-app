import React, { useState, useEffect } from "react";

import { getPokemonByName } from "../constants/index";

const useCharacters = (url) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        const result = response.json();
        return result;
      })
      .then((data) => {
        console.log(data);
        createPokemonObject(data.results);
        console.log(characters);
      });
  }, [url]);

  const createPokemonObject = (arrayPokemon) => {
    arrayPokemon.forEach((pokemon) => {
      fetch(getPokemonByName(pokemon.name))
        .then((res) => res.json())
        .then((data) => setCharacters((currentList) => [...currentList, data]));
    });
  };

  return characters;
};

export default useCharacters;
