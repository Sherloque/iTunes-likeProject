import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playSong } from "../src/store/reducers/player.reducer";
import styles from "../styles/songlist.module.scss";

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
    } else if (fetchAction) {
      dispatch(fetchAction());
    }
  }, [dispatch, fetchAction, fetchParams]);

  const renderSong = (item, i) => (
    <div className={`${styles["song"]}`} key={i}>
      <p className={`${styles["chart-position"]}`}>{item.position || "-"}</p>
      <img
        className={`${styles["song-cover"]}`}
        src={item.album?.cover}
        alt={"/assets/blank.png"}
        onClick={() =>
          dispatch(playSong({ preview: item.preview, track: item }))
        }
      />
      <div className={`${styles["song-description"]}`}>
        <p className={`${styles["song-title"]}`}>
          {item.title || "Unknown Title"}
        </p>
        <p className={`${styles["song-artist"]}`}>
          {item.artist?.name || item.artist || "Unknown Artist"}
        </p>
      </div>
      <p className={`${styles["song-duration"]}`}>
        {item.duration
          ? Math.floor(item.duration / 60) +
            ":" +
            ("0" + Math.floor(item.duration % 60)).slice(-2)
          : "-"}
      </p>
    </div>
  );

  if (!songs) {
    return <p className={`${styles["load-placeholder"]}`}>{renderLoading}</p>;
  }

  const songsArray = Array.isArray(songs) ? songs : [];

  if (songsArray.length === 0) {
    return <p className={`${styles["empty-placeholder"]}`}>{renderEmpty}</p>;
  }

  return (
    <div className={`${styles["song-list"]}`}>
      {songsArray.map((item, i) => renderSong(item, i))}
    </div>
  );
};

export default SongList;
