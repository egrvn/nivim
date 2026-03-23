import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./app/App";
import "./styles/index.css";

const redirectedPath = new URLSearchParams(window.location.search).get("p");

if (redirectedPath) {
  const decoded = decodeURIComponent(redirectedPath);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const nextPath = decoded.startsWith("/") ? decoded : `/${decoded}`;

  window.history.replaceState(null, "", `${base}${nextPath}`);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
