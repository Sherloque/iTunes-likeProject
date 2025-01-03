import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playSong,
  pauseSong,
  stopSong,
  updateTime,
  setDuration,
} from "../store/reducers/player.reducer";
import "./Player.scss";
import { jwtDecode } from "jwt-decode";
import {
  ExpandIcon,
  MinimizedIcon,
  PauseIcon,
  PlayIcon,
  FavouriteIcon,
} from "assets";
import { toFavourites } from "store/reducers/userContent.reducer";

function getTime(time) {
  return !isNaN(time)
    ? Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    : "0:00";
}

const Player = ({ track }) => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const { playerState, currentSong, trackInfo, currentTime, trackDuration } =
    useSelector((state) => state.player);

  useEffect(() => {
    const player = playerRef.current;
    if (playerState === "playing") {
      player.play();
    } else if (playerState === "paused") {
      player.pause();
    } else if (playerState === "stopped") {
      player.pause();
      player.currentTime = 0;
    }
  }, [playerState, currentSong]);

  useEffect(() => {
    const player = playerRef.current;

    const handleTimeUpdate = () => {
      dispatch(updateTime(player.currentTime));
      dispatch(setDuration(player.duration));
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    return () => player.removeEventListener("timeupdate", handleTimeUpdate);
  }, [dispatch]);

  const handlePlay = () => {
    dispatch(playSong({ preview: track.preview, track: track }));
  };

  const handleAddToFavourites = () => {
    const userId = jwtDecode(localStorage.token).sub._id;
    dispatch(
      toFavourites({
        owner: userId,
        id: track.id,
        artist: track.artist.name,
        title: track.title,
        preview: track.preview,
      })
    );
  };

  const progressPercentage = (currentTime / trackDuration) * 100 || 0;

  return (
    <div className={`global-player ${isExpanded ? "expanded" : "minimized"}`}>
      <button
        className="size-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <MinimizedIcon /> : <ExpandIcon />}
      </button>

      {isExpanded && (
        <>
          <div className="track-info">
            <div className="track-info-title">
              {trackInfo?.title || "Song Title"}
            </div>
            <div className="track-info-artist">
              {trackInfo?.artist?.name || trackInfo?.artist || "Artist"}
            </div>
          </div>
        </>
      )}

      <div className="player-progress">
        <span>{getTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={trackDuration || 0}
          value={currentTime}
          onChange={(e) => (playerRef.current.currentTime = e.target.value)}
          style={{
            "--progress": `${progressPercentage}%`,
          }}
        />
        <span>{getTime(trackDuration)}</span>
      </div>
      {isExpanded && (
        <img
          className="song-cover"
          src={trackInfo?.album?.cover || require("../assets/blank.png")}
        />
      )}

      <div className="player-controls">
        {playerState === "playing" ? (
          <button onClick={() => dispatch(pauseSong())}>
            <PauseIcon />
          </button>
        ) : (
          <button onClick={handlePlay}>
            <PlayIcon />
          </button>
        )}
        {/*<button onClick={() => dispatch(stopSong())}>
          <StopSVG />
        </button>
       */}
        <button
          className
          hidden={window.location.pathname === "/profile"}
          onClick={handleAddToFavourites}
        >
          <FavouriteIcon />
        </button>
      </div>

      <audio ref={playerRef} src={currentSong} />
    </div>
  );
};

export default Player;
