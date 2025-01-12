import React, { useState, useRef, useCallback } from "react";
import styles from "../styles/dropzone.module.scss";
import { NoteIcon } from "../public/assets";

const Dropzone = ({ disabled, onFilesAdded }) => {
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const onFilesAddedHandler = useCallback(
    (event) => {
      if (disabled) return;
      const files = event.target.files;
      if (onFilesAdded) {
        const array = fileListToArray(files);
        onFilesAdded(array);
      }
    },
    [disabled, onFilesAdded]
  );

  const onDragOver = useCallback(
    (event) => {
      event.preventDefault();
      if (!disabled) setHighlight(true);
    },
    [disabled]
  );

  const onDragLeave = useCallback(() => {
    setHighlight(false);
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (disabled) return;
      const files = event.dataTransfer.files;
      if (onFilesAdded) {
        const array = fileListToArray(files);
        onFilesAdded(array);
      }
      setHighlight(false);
    },
    [disabled, onFilesAdded]
  );

  const fileListToArray = (list) => {
    return Array.from(list);
  };

  return (
    <div
      className={`${styles["dropzone"]} ${highlight && styles["highlight"]}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      <input
        ref={fileInputRef}
        className={`${styles["dropzone-fileinput"]}`}
        type="file"
        accept=".mp3,.WAV,.Ogg,.flac"
        multiple
        onChange={onFilesAddedHandler}
      />
      <NoteIcon className={`${styles["note-icon"]}`} />
      <span className={`${styles["dropzone-text"]}`}>Drop your songs here</span>
    </div>
  );
};

export default Dropzone;
