import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import styles from "../styles/feed.module.scss";
import {
  LoginIcon,
  ProfileIcon,
  SignUpIcon,
  LogoutIcon,
} from "../public/assets";
import {
  fetchHotChart,
  fetchRecentUploads,
  fetchSearch,
} from "../src/store/reducers/explore.reducer";
import { logoutUser } from "../src/store/reducers/auth.reducer";
import debounce from "lodash.debounce";

import Player from "../components/Player";
import SongList from "../components/SongList";

const safeLocalStorage = {
  getItem: (key) =>
    typeof window !== "undefined" ? localStorage.getItem(key) : null,
  setItem: (key, value) => {
    if (typeof window !== "undefined") localStorage.setItem(key, value);
  },
};

const MainPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const track = useSelector((state) => state.player.trackInfo);
  const [searchText, setSearchText] = useState("");
  const searchResults = useSelector((state) => state.explore.searchResults);
  const [token, setToken] = useState(null);
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const token = safeLocalStorage.getItem("token");
    setToken(token);
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserLogin(decodedToken.sub.login);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  const debouncedSearch = useCallback(
    debounce((e) => {
      setSearchText(e.target.value);
      if (e.target.value.trim() === "") return;
      dispatch(fetchSearch(e.target.value));
    }, 300),
    []
  );

  return (
    <div className={`${styles["mainpage-container"]}`}>
      <header className={`${styles["mainpage-header"]}`}>
        <div className={`${styles["mainpage-header-platformname"]}`}>
          PLATFORMNAME
        </div>
        <nav className={`${styles["mainpage-nav"]}`}>
          {token ? (
            <>
              <Link
                href="/profile"
                className={`${styles["mainpage-nav-link"]}`}
              >
                Profile <ProfileIcon className={`${styles["mainpage-icon"]}`} />
              </Link>
              <Link
                href="#"
                className={`${styles["mainpage-nav-link"]}`}
                onClick={handleLogout}
              >
                Logout <LogoutIcon className={`${styles["mainpage-icon"]}`} />
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" className={`${styles["mainpage-nav-link"]}`}>
                Registration{" "}
                <SignUpIcon className={`${styles["mainpage-icon"]}`} />
              </Link>
              <Link href="/login" className={`${styles["mainpage-nav-link"]}`}>
                Login <LoginIcon className={`${styles["mainpage-icon"]}`} />
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className={`${styles["mainpage-main"]}`}>
        <>
          <section className={`${styles["welcome-section"]}`}>
            {token && (
              <div className={`${styles["welcome-section-greeting"]}`}>
                <h1>Hey, {userLogin}!</h1>
              </div>
            )}
            <div className={`${styles["banner"]}`}>
              <div className={`${styles["banner-info"]}`}>
                <h2 className={`${styles["banner-info-platformname"]}`}>
                  PLATFORMNAME
                </h2>
                <div className={`${styles["banner-info-blur-wrapper"]}`}>
                  <h2 className={`${styles["banner-info-subtitle"]}`}>
                    Discover, Share, Upload!
                  </h2>
                </div>
                <p className={`${styles["banner-info-description"]}`}>
                  Upload Your Beat, Feel the Music Heat.
                </p>
              </div>
              <img
                src="/assets/banner.png"
                alt="Music Banner"
                className={`${styles["banner-image"]}`}
              />
            </div>
          </section>

          <section className={`${styles["chart-section"]}`}>
            <input
              type="text"
              className={`${styles["chart-section-search"]}`}
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

          <section className={`${styles["uploads-section"]}`}>
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
      <footer className={`${styles["mainage-footer"]}`}>
        <p>&copy; 2024 PLATFORMNAME. All rights reserved.</p>
      </footer>
      <div
        className={`${styles["background-effect"]} ${styles["effect-1"]}`}
      ></div>
      <div
        className={`${styles["background-effect"]} ${styles["effect-2"]}`}
      ></div>
      <div
        className={`${styles["background-effect"]} ${styles["effect-3"]}`}
      ></div>
      <div
        className={`${styles["background-effect"]} ${styles["effect-4"]}`}
      ></div>
    </div>
  );
};

export default MainPage;
