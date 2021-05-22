import React from "react";
import PropTypes from "prop-types";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "../styles/components/search.css";

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        ref={searchInput}
        placeholder={"Search pokemons..."}
        className="search-input"
      />
      <SearchOutlinedIcon />
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default Search;
