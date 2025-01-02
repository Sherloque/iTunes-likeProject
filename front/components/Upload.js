import React, { useState, useCallback } from "react";
import Dropzone from "./Dropzone";
import Progress from "./Progress";
import { jwtDecode } from "jwt-decode";
import "../styles/upload.module.scss";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfulUploaded, setSuccessfulUploaded] = useState(false);

  const onFilesAdded = useCallback((newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const renderProgress = (file) => {
    const progress = uploadProgress[file.name];
    if (uploading || successfulUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={progress ? progress.percentage : 0} />
        </div>
      );
    }
  };

  const renderActions = () => {
    if (successfulUploaded) {
      return (
        <button
          className="upload-btn"
          onClick={() => {
            setFiles([]);
            setSuccessfulUploaded(false);
          }}
        >
          Delete files
        </button>
      );
    } else {
      return (
        <button
          className="upload-btn"
          disabled={uploading}
          onClick={() => {
            if (files.length === 0) {
              document.querySelector(".dropzone-fileinput").click();
            } else {
              uploadFiles();
            }
          }}
        >
          {files.length === 0 ? "Choose files" : "Upload files"}
        </button>
      );
    }
  };

  const uploadFiles = useCallback(async () => {
    setUploadProgress({});
    setUploading(true);

    const promises = files.map((file) => sendRequest(file));
    try {
      await Promise.all(promises);
      setSuccessfulUploaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }, [files]);

  const sendRequest = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: {
              state: "pending",
              percentage: (event.loaded / event.total) * 100,
            },
          }));
        }
      });

      req.upload.addEventListener("load", () => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: { state: "done", percentage: 100 },
        }));
        resolve(req.response);
      });

      req.upload.addEventListener("error", () => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: { state: "error", percentage: 0 },
        }));
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("field", jwtDecode(localStorage.token).sub._id);

      req.open("POST", "/upload");
      req.setRequestHeader("Authorization", `Bearer ${localStorage.token}`);
      req.send(formData);

      req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 400) {
          alert("This file has already been uploaded");
        }
      };
    });
  }, []);

  return (
    <div className="upload">
      <Dropzone
        onFilesAdded={onFilesAdded}
        disabled={uploading || successfulUploaded}
      />
      <div className="upload-files">
        {files.map((file) => (
          <div key={file.name} className="upload-file-row">
            <span className="upload-file">{file.name}</span>
            {renderProgress(file)}
          </div>
        ))}
      </div>
      <div className="upload-actions">{renderActions()}</div>
    </div>
  );
};

export default Upload;
