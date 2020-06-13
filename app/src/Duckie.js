import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Desktop from './Desktop';
//const { shell } = require('electron');

function Duckie() {

  function openWebsite() {
    console.log("Website");
    //shell.openExternal("https://github.com/ReshmiCode/Coding-Companion");
  }

  return (
    <div className="App">
      <header className="App-header">
        <Desktop/>
        <Link to="/">
          <button> View Website </button>
        </Link>
        <button onClick = {openWebsite}> View Website in  Browser </button>
      </header>
    </div>
  );
}

export default Duckie;
