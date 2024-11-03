import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/Astro_front/serviceWorker.js")
      .then(res => console.log("service worker registered", res))
      .catch(err => console.log("service worker not registered", err))
  })
}
