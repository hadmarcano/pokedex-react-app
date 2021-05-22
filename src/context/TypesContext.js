import React, { createContext, useState, useEffect } from "react";
import {
  getTypeOfPokemons,
  getTypeDetailByType,
  getPokemonByName,
} from "../constants";

export const TypesContext = createContext();

const TypePokemonContextProvider = ({ children }) => {
  const [doneFetchTypes, setDoneFetchTypes] = useState(false);
  const [typeDetail, setTypeDetail] = useState({});
  const [pokemonsByTypes, setPokemonsByTypes] = useState([]);
  const [currentQType, setCurrentQType] = useState("");

  //Life Cycle
  useEffect(() => {
    setPokemonsByTypes([]);
    getTypeDetails(currentQType);
  }, [currentQType]);

  // Fetchs
  const getTypeDetails = (type) => {
    if (currentQType.length > 0) {
      fetch(getTypeDetailByType(type))
        .then((res) => res.json())
        .then((data) => {
          setDoneFetchTypes(true);
          console.log(data.pokemon);
          setTypeDetail(data);
          createPokemonObject(data.pokemon);
          console.log(pokemonsByTypes);
        })
        .catch((error) => console.log(error));
    }
  };

  const createPokemonObject = (arrayPokemon) => {
    arrayPokemon.forEach((pokemon) => {
      fetch(getPokemonByName(pokemon.pokemon.name))
        .then((res) => res.json())
        .then((data) =>
          setPokemonsByTypes((currentList) => [...currentList, data])
        );
    });
  };

  const changeCurrentQType = (type) => {
    setCurrentQType(type);
  };

  const changeDoneFetchTypes = (state) => {
    setDoneFetchTypes(state);
  };

  const changePokemonsByTypes = (state) => {
    setPokemonsByTypes(state);
  };

  return (
    <TypesContext.Provider
      value={{
        currentQType,
        changeCurrentQType,
        typeDetail,
        doneFetchTypes,
        changeDoneFetchTypes,
        pokemonsByTypes,
        changePokemonsByTypes,
      }}
    >
      {children}
    </TypesContext.Provider>
  );
};

export default TypePokemonContextProvider;
