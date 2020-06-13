import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import MainApp from './MainApp';

function Website() {

  return (
    <div className="App">
      <header className="App-header">
        <MainApp/>
        <Link to="/">
          <button> View Website </button>
        </Link>
      </header>
    </div>
  );
}

export default Website;
