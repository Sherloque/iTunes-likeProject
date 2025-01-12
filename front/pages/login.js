import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../src/store/reducers/auth.reducer";
import Link from "next/link";
import styles from "../styles/login.module.scss";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, error } = useSelector((state) => state.auth);

  const validate = useCallback((loginValue, passwordValue) => {
    return loginValue.length > 0 && passwordValue.length > 0;
  }, []);

  const handleLoginChange = (e) => {
    const loginValue = e.target.value;
    setLogin(loginValue);
    setValid(validate(loginValue, password));
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setValid(validate(login, passwordValue));
  };

  const handleLoginClick = () => {
    dispatch(loginUser({ login, password }))
      .unwrap()
      .then(() => router("/feed"))
      .catch((err) => console.error(err));
  };

  return (
    <div className={`${styles["loginpage-container"]}`}>
      <div className={`${styles["login-box"]}`}>
        <h1 className={`${styles["login-heading"]}`}>Welcome Back!</h1>
        <div className={`${styles["login-inputwrapper"]}`}>
          <label htmlFor="login">Username</label>
          <input
            className={`${styles["loginpage-login"]}`}
            id="login"
            type="text"
            value={login}
            onChange={handleLoginChange}
            placeholder="Enter your username"
          />
        </div>
        <div className={`${styles["login-inputwrapper"]}`}>
          <label htmlFor="password">Password</label>
          <input
            className={`${styles["loginpage-password"]}`}
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className={`${styles["login-error"]}`}>{error}</p>}
        <button
          className={`${styles["loginpage-login-btn"]} ${
            !valid || isLoading ? styles["disabled-btn"] : styles[""]
          }`}
          disabled={!valid || isLoading}
          onClick={handleLoginClick}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        <button className={`${styles["loginpage-cancel-btn"]}`}>
          <Link href="/feed">Cancel</Link>
        </button>
        <Link className={`${styles["loginpage-signup-link"]}`} href="/signup">
          I don't have an account
        </Link>
      </div>
      <div
        className={`${styles["background-effect"]} ${styles["effect-2"]}`}
      ></div>
      <div
        className={`${styles["background-effect"]} ${styles["effect-2"]}`}
      ></div>
    </div>
  );
};

export default LoginPage;
