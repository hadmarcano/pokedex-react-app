import React, { createContext, useState, useEffect } from "react";
import { getTypeOfPokemons, getTypeDetailByType } from "../constants";

export const TypesContext = createContext();

const TypePokemonContextProvider = ({ children }) => {
  const [doneFetchTypes, setDoneFetchTypes] = useState(false);
  const [typeDetail, setTypeDetail] = useState({});
  const [currentQType, setCurrentQType] = useState("");

  //Life Cycle
  useEffect(() => {
    getTypeDetails(currentQType);
  }, [currentQType]);

  // Fetchs
  const getTypeDetails = (type) => {
    if (currentQType.length > 0) {
      fetch(getTypeDetailByType(type))
        .then((res) => res.json())
        .then((data) => {
          setDoneFetchTypes(true);
          console.log(data);
          setTypeDetail(data);
        })
        .catch((error) => console.log(error));
    }
  };

  const changeCurrentQType = (type) => {
    setCurrentQType(type);
  };

  const changeDoneFetchTypes = (state) => {
    setDoneFetchTypes(state);
  };

  return (
    <TypesContext.Provider
      value={{
        currentQType,
        changeCurrentQType,
        typeDetail,
        doneFetchTypes,
        changeDoneFetchTypes,
      }}
    >
      {children}
    </TypesContext.Provider>
  );
};

export default TypePokemonContextProvider;
