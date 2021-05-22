import React, { useState, useEffect } from "react";

const useInitialState = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (payload) => {
    setFavorites([...favorites, payload]);
  };

  const removeFromFavorite = (payload) => {
    setFavorites(favorites.filter((items) => items.id !== payload.id));
  };

  return {
    addToFavorite,
    removeFromFavorite,
    favorites,
  };
};

export default useInitialState;
