import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchPersonalUploads } from "../store/action";
import Player from "../MainPage/Player";
import "./Favourites.css";

const UserUploads = () => {
  const dispatch = useDispatch();
  const userUploads = useSelector((state) => state.userUploads.userUploads);

  useEffect(() => {
    const userId = jwtDecode(localStorage.token).sub._id;
    dispatch(fetchPersonalUploads(userId));
  }, [dispatch]);

  return (
    <>
      <div>
        {userUploads === null ? (
          <p className="load-placeholder">Fetching personal uploads</p>
        ) : userUploads.length > 0 ? (
          userUploads.map((item, i) => (
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
            Empty! Start uploading your songs now
          </p>
        )}
      </div>
    </>
  );
};

export default UserUploads;
