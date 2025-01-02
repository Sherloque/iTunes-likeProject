import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { signUser } from "../src/store/reducers/auth.reducer";
import "../styles/signup.module.scss";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    subpass: "",
    firstname: "",
    lastname: "",
  });
  const [validPass, setValidPass] = useState(false);
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { error, isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePass = useCallback(
    () => formData.password === formData.subpass,
    [formData.password, formData.subpass]
  );

  const validateForm = useCallback(
    () =>
      formData.login.length > 0 &&
      formData.firstname.length > 0 &&
      formData.lastname.length > 0,
    [formData.login, formData.firstname, formData.lastname]
  );

  useEffect(() => {
    setValid(validateForm());
    setValidPass(validatePass());
  }, [formData, validateForm, validatePass]);

  const handleSignUp = () => {
    dispatch(
      signUser({
        login: formData.login,
        password: formData.password,
        firstname: formData.firstname,
        lastname: formData.lastname,
        router,
      })
    );
  };

  return (
    <div className="signpage-container">
      <div className="sign-box">
        <div className="sign-box-login">
          <h1 className="sign-box-login-heading">WELCOME BACK!</h1>
          <button className="sign-box-login-btn">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
        <div className="sign-box-form">
          <h1 className="sign-box-form-heading">Create Account</h1>
          <div className="sign-inputwrapper">
            <label htmlFor="login">Username</label>
            <input
              required
              className="sign-input"
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="sign-inputwrapper">
            <label htmlFor="password">Password</label>
            <input
              required
              className="sign-input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="sign-inputwrapper">
            <label htmlFor="subpass">Repeat password</label>
            <input
              className="sign-input"
              type="password"
              id="subpass"
              name="subpass"
              value={formData.subpass}
              onChange={handleChange}
              placeholder="Repeat your password"
            />
          </div>
          <div className="sign-inputwrapper">
            <label htmlFor="firstname">Firstname</label>
            <input
              className="sign-input"
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter your firstname"
            />
          </div>
          <div className="sign-inputwrapper">
            <label htmlFor="lastname">Lastname</label>
            <input
              className="sign-input"
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter your lastname"
            />
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          <button
            className={`signup-btn ${!valid ? "disabled-btn" : ""}`}
            disabled={!(valid && validPass) || isLoading}
            onClick={handleSignUp}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <button className="cancel-btn">
            <Link to="/feed">Cancel</Link>
          </button>
        </div>
      </div>
      <div className="background-effect effect-1"></div>
      <div className="background-effect effect-2"></div>
    </div>
  );
};

export default SignUpPage;
