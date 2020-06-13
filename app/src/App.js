import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require("axios");

function App() {
  const [user, setUser] = useState('');
  const [commits, setCommits] = useState([]);

  async function getCommits() {
    const commits = await axios.get(`https://api.github.com/users/${user}/events`);
    setCommits(commits.data);
  }

  async function getJoke() {
    const { data } =  await axios.get("https://official-joke-api.appspot.com/jokes/programming/random");
    console.log(data[0].setup);
    //await testToSpeech(data[0].setup);
    console.log(data[0].punchline);
    //await testToSpeech(data[0].punchline);
  }

  async function getProgrammingQuote() {
    const { data } =  await axios.get("http://quotes.stormconsultancy.co.uk/random.json");
    console.log(data.quote);
    //await testToSpeech(data.quote);
    console.log(data.author);
    //await testToSpeech(data.author);
  }

  async function getQuote() {
    const { data } =  await axios.get("http://api.quotable.io/random");
    console.log(data.content);
    //await testToSpeech(data.content);
    console.log(data.author);
    //await testToSpeech(data.author);
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
        <button onClick={getProgrammingQuote}>
          Get a Programming Quote
        </button>
        <button onClick={getQuote}>
          Get an Inspirational Quote
        </button>
      </header>
    </div>
  );
}

export default App;
