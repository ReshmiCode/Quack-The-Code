import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require("axios");

function App() {
  async function getJoke() {
    const { data } =  await axios.get("https://official-joke-api.appspot.com/jokes/programming/random");
    console.log(data[0].setup);
    //await testToSpeech(data[0].setup);
    console.log(data[0].punchline);
    //await testToSpeech(data[0].punchline);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={getJoke}>
          Get a Joke
        </button>
        <button>
          Get an Inspirational Quote
        </button>
      </header>
    </div>
  );
}

export default App;
