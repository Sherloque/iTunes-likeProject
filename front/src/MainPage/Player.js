import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toFavourites } from "../store/action.js";
import "./Player.css";
import { ReactComponent as PlaySVG } from "./logos/play.svg";
import { ReactComponent as PauseSVG } from "./logos/pause.svg";
import { ReactComponent as StopSVG } from "./logos/stop.svg";
import { ReactComponent as FavouritesSVG } from "./logos/bookmark.svg";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
  return "0:00";
}

const Player = ({ track }) => {
  const [playerState, setPlayerState] = useState("stopped");
  const [currentSong, setCurrentSong] = useState(null);
  const [trackDuration, setTrackDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const player = playerRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(player.currentTime);
      setTrackDuration(player.duration);

      if (player.currentTime === player.duration) {
        setPlayerState("stopped");
      }
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    return () => player.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    const player = playerRef.current;

    if (currentSong) {
      player.src = currentSong;
      player.play();
      setPlayerState("playing");
    }
  }, [currentSong]);

  useEffect(() => {
    const player = playerRef.current;

    if (playerState === "paused") {
      player.pause();
    } else if (playerState === "stopped") {
      player.pause();
      player.currentTime = 0;
      setCurrentSong(null);
    } else if (playerState === "playing") {
      player.play();
    }
  }, [playerState]);

  const handleAddToFavourites = () => {
    const userId = jwtDecode(localStorage.token).sub._id;
    dispatch(
      toFavourites(
        userId,
        track.id,
        track.artist.name,
        track.title,
        track.preview
      )
    );
  };

  const currentTimeFormatted = getTime(currentTime);
  const trackDurationFormatted = getTime(trackDuration);

  return (
    <>
      {playerState === "stopped" && (
        <button
          className="player-btn"
          onClick={() => {
            setCurrentSong(track.preview);
            setPlayerState("playing");
          }}
        >
          <PlaySVG className="svg" />
        </button>
      )}

      {playerState === "paused" && (
        <button
          className="player-btn"
          onClick={() => setPlayerState("playing")}
        >
          <PlaySVG className="svg" />
        </button>
      )}

      {playerState === "playing" && (
        <button className="player-btn" onClick={() => setPlayerState("paused")}>
          <PauseSVG className="svg" />
        </button>
      )}

      {(playerState === "playing" || playerState === "paused") && (
        <button
          className="player-btn"
          onClick={() => setPlayerState("stopped")}
        >
          <StopSVG className="svg" />
        </button>
      )}

      {(playerState === "playing" || playerState === "paused") && (
        <div className="player-timer">
          {currentTimeFormatted} / {trackDurationFormatted}
        </div>
      )}

      <audio ref={playerRef} />

      <button
        className="player-btn"
        hidden={window.location.pathname === "/profile"}
        onClick={handleAddToFavourites}
      >
        <FavouritesSVG className="svg" />
      </button>
    </>
  );
};

export default Player;
