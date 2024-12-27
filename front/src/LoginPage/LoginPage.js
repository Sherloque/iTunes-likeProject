import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/reducers/auth.reducer";
import "./LoginPage.scss";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .then(() => navigate("/feed"))
      .catch((err) => console.error(err));
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
        {error && <p className="login-error">{error}</p>}
        <button
          className={`loginpage-login-btn ${
            !valid || isLoading ? "disabled-btn" : ""
          }`}
          disabled={!valid || isLoading}
          onClick={handleLoginClick}
        >
          {isLoading ? "Signing In..." : "Sign In"}
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
