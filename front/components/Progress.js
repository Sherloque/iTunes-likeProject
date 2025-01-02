import React from "react";
import "../styles/progress.module.scss";

const Progress = ({ progress }) => (
  <div className="ProgressBar">
    <div className="Progress" style={{ width: `${progress}%` }} />
  </div>
);

export default Progress;
