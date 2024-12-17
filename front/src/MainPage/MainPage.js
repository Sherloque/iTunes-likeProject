import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Chart from "./Chart";
import RecentUploads from "./RecentUploads";
import "./MainPage.scss";
import { LoginIcon, ProfileIcon, SignUpIcon, LogoutIcon } from "assets";
import Player from "./Player";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const track = useSelector((state) => state.player.trackInfo);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT_USER" });
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const userLogin = token ? jwtDecode(token).sub.login : null;

  return (
    <div className="mainpage-container">
      <header className="mainpage-header">
        <div className="mainpage-header-platformname">PLATFORMNAME</div>
        <nav className="mainpage-nav">
          {token ? (
            <>
              <Link to="/profile" className="nav-link">
                Profile <ProfileIcon className="nav-icon" />
              </Link>
              <Link className="nav-link" onClick={handleLogout}>
                Logout <LogoutIcon className="nav-icon" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">
                Registration <SignUpIcon className="nav-icon" />
              </Link>
              <Link to="/login" className="nav-link">
                Login <LoginIcon className="nav-icon" />
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="mainpage-main">
        <>
          <section className="welcome-section">
            {token && (
              <div className="welcome-section-greeting">
                <h1>Hey, {userLogin}!</h1>
              </div>
            )}
            <div className="banner">
              <div className="banner-info">
                <h2 className="banner-info-platformname">PLATFORMNAME</h2>
                <div className="banner-info-blur-wrapper">
                  <h2 className="banner-info-subtitle">
                    Discover, Share, Upload!
                  </h2>
                </div>
                <p className="banner-info-description">
                  Upload Your Beat, Feel the Music Heat.
                </p>
              </div>
              <img
                src={require("../assets/banner.png")}
                alt="Music Banner"
                className="banner-image"
              />
            </div>
          </section>

          <section className="chart-section">
            <input
              type="text"
              className="chart-section-search"
              placeholder="Search..."
            />
            <h2>Deezer Hot 10 Chart</h2>
            <Chart />
          </section>

          <section className="uploads-section">
            <h2>Recent Uploads</h2>
            <RecentUploads />
          </section>
        </>
        {track && <Player track={track}></Player>}
      </main>
      <footer className="mainpage-footer">
        <p>&copy; 2024 PLATFORMNAME. All rights reserved.</p>
      </footer>
      <div class="background-effect effect-1"></div>
      <div class="background-effect effect-2"></div>
      <div class="background-effect effect-3"></div>
      <div class="background-effect effect-4"></div>
    </div>
  );
};

export default MainPage;
