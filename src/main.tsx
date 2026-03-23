import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import { initAuthListener } from "./services/authListener";

/**
 * Initialize Firebase auth listener
 */
initAuthListener();

/**
 * Apply saved theme on load
 */
const theme = localStorage.getItem("theme");
document.documentElement.classList.toggle("dark", theme === "dark");

/**
 * Register Service Worker
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service Worker registered");
      })
      .catch((err) => {
        console.error("SW registration failed:", err);
      });
  });
}

/**
 * Request Notification Permission
 */
if ("Notification" in window) {
  Notification.requestPermission();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Toaster position="top-right" />
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);