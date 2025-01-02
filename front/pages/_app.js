// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import store from "../src/store/store"; // Adjust the path to your store

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
