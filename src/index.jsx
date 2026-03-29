import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import "./styles/app.scss";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

root.render(<App />);
