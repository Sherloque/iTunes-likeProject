import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "MainPage/MainPage";
import LoginPage from "LoginPage/LoginPage";
import SignUpPage from "SignUpPage/SignUpPage";
import ProfilePage from "ProfilePage/ProfilePage";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/feed" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
