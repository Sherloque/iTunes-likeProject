import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playSong } from "../store/reducers/player.reducer";
import "./SongList.scss";

const SongList = ({
  fetchAction,
  selector,
  renderEmpty,
  renderLoading,
  fetchParams,
}) => {
  const dispatch = useDispatch();
  const songs = useSelector(selector);

  useEffect(() => {
    if (fetchParams) {
      dispatch(fetchAction(fetchParams));
    } else {
      dispatch(fetchAction());
    }
  }, [dispatch, fetchAction, fetchParams]);

  const renderSong = (item, i) => (
    <div className="song" key={i}>
      <p className="chart-position">{item.position || "-"}</p>
      <img
        className="song-cover"
        src={item.album?.cover || require("../assets/blank.png")}
        onClick={() =>
          dispatch(playSong({ preview: item.preview, track: item }))
        }
      />
      <div className="song-description">
        <p className="song-title">{item.title || "Unknown Title"}</p>
        <p className="song-artist">
          {item.artist?.name || item.artist || "Unknown Artist"}
        </p>
      </div>
      <p className="song-duration">
        {item.duration
          ? Math.floor(item.duration / 60) +
            ":" +
            ("0" + Math.floor(item.duration % 60)).slice(-2)
          : "-"}
      </p>
    </div>
  );

  if (!songs) {
    return <p className="load-placeholder">{renderLoading}</p>;
  }

  const songsArray = Array.isArray(songs) ? songs : [];

  if (songsArray.length === 0) {
    return <p className="empty-placeholder">{renderEmpty}</p>;
  }

  return (
    <div className="song-list">
      {songsArray.map((item, i) => renderSong(item, i))}
    </div>
  );
};

export default SongList;
