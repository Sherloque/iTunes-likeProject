import React, { useState, useRef, useCallback } from "react";
import "./Dropzone.scss";
import { NoteIcon } from "assets";

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
      className={`dropzone ${highlight ? "highlight" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      <input
        ref={fileInputRef}
        className="dropzone-fileinput"
        type="file"
        accept=".mp3,.WAV,.Ogg,.flac"
        multiple
        onChange={onFilesAddedHandler}
      />
      <NoteIcon className="note-icon" />
      <span className="dropzone-text">Drop your songs here</span>
    </div>
  );
};

export default Dropzone;
