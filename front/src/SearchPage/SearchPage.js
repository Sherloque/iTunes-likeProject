import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../store/action.js";
import Player from "../MainPage/Player";

const SearchPage = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(
    (store) => store.searchResults.searchResults
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchSearch(value));
  };

  return (
    <div className="box">
      <button className="mainpage-profile-btn">
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          Профиль
        </Link>
      </button>
      <button className="search-tomain-btn">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          To main
        </Link>
      </button>
      <div>
        <input
          className="search-input"
          placeholder="Enter song name or artist"
          onChange={handleInputChange}
          value={value}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      {Array.isArray(searchResults) ? (
        searchResults.map((item, i) => (
          <div className="results-block" key={i}>
            <p className="chart-title">{`${item.artist} - ${item.songname}`}</p>
            <Player track={item} />
          </div>
        ))
      ) : (
        <p className="load-placeholder">LOADING...</p>
      )}
    </div>
  );
};

export default SearchPage;
