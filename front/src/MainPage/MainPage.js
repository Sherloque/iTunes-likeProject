import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./MainPage.scss";
import { LoginIcon, ProfileIcon, SignUpIcon, LogoutIcon } from "assets";
import {
  fetchHotChart,
  fetchRecentUploads,
  fetchSearch,
} from "store/reducers/explore.reducer";
import { logoutUser } from "store/reducers/auth.reducer";
import debounce from "lodash.debounce";

import Player from "./Player";
import SongList from "SongList/SongList";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const track = useSelector((state) => state.player.trackInfo);
  const [searchText, setSearchText] = useState("");
  const searchResults = useSelector((state) => state.explore.searchResults);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const debouncedSearch = useCallback(
    debounce((e) => {
      setSearchText(e.target.value);
      if (e.target.value.trim() === "") return;
      dispatch(fetchSearch(e.target.value));
    }, 300),
    []
  );

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
              onChange={debouncedSearch}
            />
            {searchText.trim() ? (
              <>
                <h2>Search Results</h2>
                {searchResults && searchResults.length > 0 ? (
                  <SongList
                    selector={(state) => state.explore.searchResults || []}
                    renderEmpty="No search results available."
                    renderLoading="Loading search results..."
                  />
                ) : (
                  <p>No results found</p>
                )}
              </>
            ) : (
              <>
                <h2>Deezer Hot 10 Chart</h2>
                <SongList
                  fetchAction={fetchHotChart}
                  selector={(state) => state.explore.hotChart?.data || []}
                  renderEmpty="No chart data available."
                  renderLoading="Loading charts..."
                />
              </>
            )}
          </section>

          <section className="uploads-section">
            <h2>Recent Uploads</h2>
            <SongList
              fetchAction={fetchRecentUploads}
              selector={(state) => state.explore.recentUploads || []}
              renderEmpty="No recent uploads available."
              renderLoading="Loading recent uploads..."
            />
          </section>
        </>
        {track && <Player track={track}></Player>}
      </main>
      <footer className="mainpage-footer">
        <p>&copy; 2024 PLATFORMNAME. All rights reserved.</p>
      </footer>
      <div className="background-effect effect-1"></div>
      <div className="background-effect effect-2"></div>
      <div className="background-effect effect-3"></div>
      <div className="background-effect effect-4"></div>
    </div>
  );
};

export default MainPage;
