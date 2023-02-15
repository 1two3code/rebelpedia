import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import "./index.scss";
import Scrapyard from "./components/views/Scrapyard/Scrapyard";
import reportWebVitals from "./reportWebVitals";
import Factory from "./components/views/Factory/Factory";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <nav>
        <Link to="/">Factory</Link>
        <Link to="scrapyard">Scrapyard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Factory />} />
        <Route path="/scrapyard" element={<Scrapyard />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
