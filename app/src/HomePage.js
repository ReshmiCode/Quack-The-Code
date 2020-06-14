import React, { useState, useEffect } from "react";
import logo from "./duck0.png";
import "./App.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Quack the Code </p>
        <Link to="/app">
          <button
            style={{
              width: 120,
              height: 40,
              margin: 5,
              borderRadius: 20,
              backgroundColor: "#5295c7",
              border: "none",
              color: "#07002c",
            }}
          >
            {" "}
            Go to App{" "}
          </button>
        </Link>
      </header>
    </div>
  );
}

export default HomePage;
