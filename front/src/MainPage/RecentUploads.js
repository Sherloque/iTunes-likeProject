import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecentUploads, playSong } from "../store/action.js";

const RecentUploads = () => {
  const dispatch = useDispatch();
  const recentUploads = useSelector((store) => store.fresh.recentUploads);

  useEffect(() => {
    dispatch(fetchRecentUploads());
  }, [dispatch]);

  if (!Array.isArray(recentUploads)) {
    return <p className="load-placeholder">LOADING...</p>;
  }

  return (
    <>
      {recentUploads
        .slice()
        .reverse()
        .map((item, i) => (
          <div className="song" key={i}>
            <p className="chart-position">{item.position}</p>
            <img
              className="song-cover"
              src={item.album?.cover || require("../assets/blank.png")}
              onClick={() => dispatch(playSong(item.preview, item))}
            />
            <div className="song-description">
              <p className="song-title">{item.songname.split('.')[0]}</p>
              <p className="song-artist">{item.artist}</p>
            </div>
            <p className="song-duration">
              {Math.floor(item.duration / 60) +
                ":" +
                ("0" + Math.floor(item.duration % 60)).slice(-2)}
            </p>
          </div>
        ))}
    </>
  );
};

export default RecentUploads;
