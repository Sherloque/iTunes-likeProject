import React from "react";
import styles from "../styles/progress.module.scss";

const Progress = ({ progress }) => (
  <div className={`${styles["ProgressBar"]}`}>
    <div
      className={`${styles["Progress"]}`}
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default Progress;
