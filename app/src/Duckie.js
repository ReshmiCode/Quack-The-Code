import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import MainApp from './MainApp';
//const { shell } = require('electron');

function Duckie() {

  function openWebsite() {
    console.log("Website");
    //shell.openExternal("https://github.com/ReshmiCode/Coding-Companion");
  }

  return (
    <div className="App">
      <header className="App-header">
        <MainApp/>
        <Link to="/">
          <button> View Website </button>
        </Link>
        <button onClick = {openWebsite}> View Website in  Browser </button>
      </header>
    </div>
  );
}

export default Duckie;
