import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Desktop from './Desktop';

function Duckie() {

  return (
    <div className="App">
      <header className="App-header">
        <Desktop/>
        <Link to="/">
          <button> View Website </button>
        </Link>
      </header>
    </div>
  );
}

export default Duckie;
