import React from "react";
import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route ,Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <nav className="flex flex-row align-middle justify-evenly bg-blue-300 rounded  text-xl text-slate-200">
      <Link to="/"> 1</Link>
      <Link to="/geek"> 2</Link>
      <input
        className="max-w-[10rem] max-h-[1rem] my-auto text-xs text-black justify-self-end rounded pl-2  
        "
        type="text"
        placeholder="SEARCH"
      ></input>
    </nav>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
