import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Duckie </p>
        <Link to ='/duckie'>
            <button> Go to App  </button>
        </Link>
      </header>
    </div>
  );
}

export default HomePage;