import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUser } from "../store/action.js";
import "./LoginPage.scss";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    dispatch(logUser(login, password, navigate));
  };

  return (
    <div className="loginpage-container">
      <div className="login-box">
        <h1 className="login-heading">Welcome Back!</h1>
        <div className="login-inputwrapper">
          <label for="login">Username</label>
          <input
            className="loginpage-login"
            id="login"
            type="text"
            value={login}
            onChange={handleLoginChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="login-inputwrapper">
          <label for="password">Password</label>
          <input
            className="loginpage-password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>

        <button
          className={`loginpage-login-btn ${!valid ? "disabled-btn" : ""}`}
          disabled={!valid}
          onClick={handleLoginClick}
        >
          Sign In
        </button>
        <button className="loginpage-cancel-btn">
          <Link to="/feed">Cancel</Link>
        </button>
        <Link className="loginpage-signup-link" to="/signup">
          I don't have an account
        </Link>
      </div>
      <div className="background-effect effect-1"></div>
      <div className="background-effect effect-2"></div>
    </div>
  );
};

export default LoginPage;
