import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Upload from "../components/Upload.js";
import styles from "../styles/profile.module.scss";
import { EditProfileIcon } from "../public/assets";
import SongList from "../components/SongList.js";
import Player from "../components/Player.js";
import { changeUserInfo } from "../src/store/reducers/auth.reducer.js";
import safeLocalStorage from "../src/safeLocalStorage";
import {
  fetchPersonalFavourites,
  fetchPersonalUploads,
} from "../src/store/reducers/userContent.reducer.js";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const token = safeLocalStorage.getItem("token");
  const user = token ? jwtDecode(token).sub : null;

  const [login, setLogin] = useState(user?.login || "");
  const [password, setPassword] = useState("");
  const [verpass, setVerpass] = useState("");
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [valid, setValid] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setValid(login.length > 0 && firstname.length > 0 && lastname.length > 0);
    setValidPass(password === verpass);
  }, [login, firstname, lastname, password, verpass]);

  const track = useSelector((state) => state.player.trackInfo);
  const { error, isLoading } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (user?._id) {
      dispatch(
        changeUserInfo(
          { id: user._id, login, firstname, lastname, password } || null
        )
      );
    }
  };

  if (!token) {
    return <p>UNAUTHORIZED</p>;
  }

  return (
    <div className={`${styles["profilepage-container"]}`}>
      <header className={`${styles["profilepage-header"]}`}>
        <div className={`${styles["profilepage-header-platformname"]}`}>
          PLATFORMNAME
        </div>
      </header>
      <div className={`${styles["profile-box"]}`}>
        <p className={`${styles["profile-box-name"]}`}>
          {firstname + " " + lastname}
        </p>
        <p className={`${styles["profile-box-login"]}`}>{login}</p>
        <button
          className={`${styles["profile-box-edit"]}`}
          onClick={() => setIsModalOpen(true)}
        >
          <EditProfileIcon className={`${styles["nav-icon"]}`} />
        </button>
        <button className={`${styles["profile-box-tomain"]}`}>
          <Link href="/feed">Return</Link>
        </button>

        <div className={`${styles["upload-block"]}`}>
          <Upload />
        </div>

        <h1>Favourites</h1>
        <SongList
          fetchAction={fetchPersonalFavourites}
          selector={(state) => state.userContent.favourites || []}
          renderEmpty="Empty! Start adding songs to your favourites now."
          renderLoading="Fetching personal favourites..."
          fetchParams={user._id}
        />

        <h1>Your songs</h1>
        <SongList
          fetchAction={fetchPersonalUploads}
          selector={(state) => state.userContent.uploads || []}
          renderEmpty="Empty! Start uploading your songs now."
          renderLoading="Fetching personal uploads..."
          fetchParams={user._id}
        />
      </div>
      {track && <Player track={track}></Player>}

      <div
        className={`${styles["background-effect"]} ${styles["effect-1"]}`}
      ></div>
      <div
        className={`${styles["background-effect"]} ${styles["effect-2"]}`}
      ></div>

      {isModalOpen && (
        <div
          className={`${styles["modal-overlay"]}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className={`${styles["modal-content"]}`}>
            <h2 className={`${styles["modal-heading"]}`}>Edit your profile</h2>
            <div className={`${styles["profile-inputwrapper"]}`}>
              <label htmlFor="username">Username</label>
              <input
                className={`${styles["profile-input"]}`}
                placeholder="Username"
                name="username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className={`${styles["profile-inputwrapper"]}`}>
              <label htmlFor="firstname">Firstname</label>
              <input
                className={`${styles["profile-input"]}`}
                placeholder="Firstname"
                value={firstname}
                name="firstname"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className={`${styles["profile-inputwrapper"]}`}>
              <label htmlFor="lastname">Lastname</label>
              <input
                className={`${styles["profile-input"]}`}
                placeholder="Lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className={`${styles["profile-inputwrapper"]}`}>
              <label htmlFor="password">Password</label>
              <input
                className={`${styles["profile-input"]}`}
                type="password"
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={`${styles["profile-inputwrapper"]}`}>
              <label htmlFor="verpass">Repeat password</label>
              <input
                className={`${styles["profile-input"]}`}
                type="password"
                name="verpass"
                placeholder="Repeat your new password"
                value={verpass}
                onChange={(e) => setVerpass(e.target.value)}
              />
            </div>
            {error && <p className={`${styles["error-message"]}`}>{error}</p>}
            <button
              className={`${styles["modal-submit-btn"]}`}
              disabled={!(valid && validPass) || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Saving" : "Save"}
            </button>
            <button
              className={`${styles["modal-close-btn"]}`}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
