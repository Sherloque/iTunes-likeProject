import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotChart } from "../store/action.js";
import Player from "./Player";
import "./Chart.scss";

const Chart = () => {
  const dispatch = useDispatch();
  const chartSongs = useSelector((state) => state.chart.chartSongs);

  useEffect(() => {
    dispatch(fetchHotChart());
  }, [dispatch]);

  return (
    <>
      {chartSongs.data ? (
        chartSongs.data.map((item, i) => (
          <div className="song" key={i}>
            <p className="chart-position">{item.position}</p>
            <img className="song-cover" src={item.album.cover} />
            <div className="song-description">
              <p className="song-title">{item.title}</p>
              <p className="song-artist">{item.artist.name}</p>
            </div>
            <p className="song-duration">{Math.floor(item.duration / 60) + ":" + ("0" + Math.floor(item.duration % 60)).slice(-2)}</p>

            <Player track={item}></Player>
          </div>
        ))
      ) : (
        <p className="load-placeholder">Loading...</p>
      )}
    </>
  );
};

export default Chart;
