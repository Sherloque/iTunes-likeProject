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
import bannerImg from "../public/banner.png";

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
    <div className={styles.mainpageContainer}>
      <header className={styles.mainpageHeader}>
        <div className={styles.mainpageHeaderPlatformname}>PLATFORMNAME</div>
        <nav className={styles.mainpageNav}>
          {token ? (
            <>
              <Link href="/profile" className={styles.navLink}>
                Profile <ProfileIcon className={styles.navIcon} />
              </Link>
              <Link href="#" className={styles.navLink} onClick={handleLogout}>
                Logout <LogoutIcon className={styles.navIcon} />
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" className={styles.navLink}>
                Registration <SignUpIcon className={styles.navIcon} />
              </Link>
              <Link href="/login" className={styles.navLink}>
                Login <LoginIcon className={styles.navIcon} />
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className={styles.mainpageMain}>
        <>
          <section className={styles.welcomeSection}>
            {token && (
              <div className={styles.welcomeSectionGreeting}>
                <h1>Hey, {userLogin}!</h1>
              </div>
            )}
            <div className={styles.banner}>
              <div className={styles.bannerInfo}>
                <h2 className={styles.bannerInfoPlatformname}>PLATFORMNAME</h2>
                <div className={styles.bannerInfoBlurWrapper}>
                  <h2 className={styles.bannerInfoSubtitle}>
                    Discover, Share, Upload!
                  </h2>
                </div>
                <p className={styles.bannerInfoDescription}>
                  Upload Your Beat, Feel the Music Heat.
                </p>
              </div>
              <img
                src={bannerImg}
                alt="Music Banner"
                className={styles.bannerImage}
              />
            </div>
          </section>

          <section className={styles.chartSection}>
            <input
              type="text"
              className={styles.chartSectionSearch}
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

          <section className={styles.uploadsSection}>
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
      <footer className={styles.mainpageFooter}>
        <p>&copy; 2024 PLATFORMNAME. All rights reserved.</p>
      </footer>
      <div className={styles.backgroundEffect1}></div>
      <div className={styles.backgroundEffect2}></div>
      <div className={styles.backgroundEffect3}></div>
      <div className={styles.backgroundEffect4}></div>
    </div>
  );
};

export default MainPage;
