import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import MainApp from './MainApp';
//const { shell } = require('electron');

function Desktop() {

  function openWebsite() {
    console.log("Website");
    //shell.openExternal("https://github.com/ReshmiCode/Coding-Companion");
  }

  return (
    <div className="App">
      <header className="App-header">
        <MainApp/>
        <button onClick = {openWebsite}> View Website in  Browser </button>
      </header>
    </div>
  );
}

export default Desktop;
