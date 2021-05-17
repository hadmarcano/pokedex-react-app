import React, { useState, useEffect } from "react";
import { getPokemonNames } from "../constants/index";

const usePokemonNames = () => {
  const [pokemonNames, setPokemonNames] = useState([]);

  useEffect(() => {
    fetch(getPokemonNames())
      .then((response) => {
        const result = response.json();
        return result;
      })
      .then((data) => {
        console.log(data);
        setPokemonNames(data.results);
      });
    return pokemonNames;
  }, []);

  return pokemonNames;
};

export default usePokemonNames;
