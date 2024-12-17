import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecentUploads } from "../store/action.js";

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
      {recentUploads.slice().reverse().map((item, i) => (
        <div className="song-block" key={i}>
          <p className="chart-title">
            {`${item.artist} - ${item.songname}`}
          </p>
        </div>
      ))}
    </>
  );
};

export default RecentUploads;