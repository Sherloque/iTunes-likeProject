import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { changeUserInfo } from "../store/action.js";
import Favourites from "./Favourites";
import UserUploads from "./UserUploads";
import Upload from "../Upload/Upload";
import "./ProfilePage.scss";
import { EditProfileIcon } from "assets/index.js";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
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

  const handleSubmit = () => {
    if (user?._id) {
      dispatch(
        changeUserInfo(user._id, login, firstname, lastname, password || null)
      );
    }
  };

  if (!token) {
    return <p>UNAUTHORIZED</p>;
  }

  return (
    <div className="profilepage-container">
      <header className="profilepage-header">
        <div className="profilepage-header-platformname">PLATFORMNAME</div>
      </header>
      <div className="profile-box">
        <p className="profile-box-name">{firstname + " " + lastname}</p>
        <p className="profile-box-login">{login}</p>
        <button
          className="profile-box-edit"
          onClick={() => setIsModalOpen(true)}
        >
          <EditProfileIcon className="nav-icon" />
        </button>
        <button className="profile-box-tomain">
          <Link to="/feed">
            Return
          </Link>
        </button>

        <div className="upload-block">
          <Upload />
        </div>

        <h1>Favourites</h1>
        <Favourites />

        <h1>Your songs</h1>
        <UserUploads />
      </div>
      
      <div class="background-effect effect-1"></div>
      <div class="background-effect effect-2"></div>
    </div>
  );
};

export default ProfilePage;
