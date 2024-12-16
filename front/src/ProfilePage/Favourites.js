import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchPersonalFavourites } from "../store/action";
import Player from "../MainPage/Player";
import "./Favourites.css";

const Favourites = () => {
  const dispatch = useDispatch();
  const favouriteSongs = useSelector(
    (state) => state.favourites.favouriteSongs
  );

  useEffect(() => {
    const userId = jwtDecode(localStorage.token).sub._id;
    dispatch(fetchPersonalFavourites(userId));
  }, [dispatch]);

  return (
    <div>
      {favouriteSongs === null ? (
        <p className="load-placeholder">Fetching personal favoutires</p>
      ) : favouriteSongs.length > 0 ? (
        favouriteSongs.map((item, i) => (
          <div className="song" key={i}>
            <p className="chart-position">{item.position}</p>
            <img className="song-cover" src={item.album.cover} />
            <div className="song-description">
              <p className="song-title">{item.title}</p>
              <p className="song-artist">{item.artist.name}</p>
            </div>
            <p className="song-duration">
              {Math.floor(item.duration / 60) +
                ":" +
                ("0" + Math.floor(item.duration % 60)).slice(-2)}
            </p>

            <Player track={item}></Player>
          </div>
        ))
      ) : (
        <p className="empty-placeholder">
          Empty! Start adding songs to your favourites now
        </p>
      )}
    </div>
  );
};

export default Favourites;
