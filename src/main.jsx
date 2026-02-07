import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import { registerSW } from "./utils/serviceWorker";

// Register Service Worker for offline support and performance
if ('serviceWorker' in navigator) {
  registerSW();
}

<ErrorBoundary>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ErrorBoundary>
  </React.StrictMode >
);
