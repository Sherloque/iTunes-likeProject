import React from "react";
import "./Progress.scss";

const Progress = ({ progress }) => (
  <div className="ProgressBar">
    <div className="Progress" style={{ width: `${progress}%` }} />
  </div>
);

export default Progress;
