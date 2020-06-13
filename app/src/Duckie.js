import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Speech from "speak-tts";
import { Link } from "react-router-dom";

const axios = require("axios");
const _ = require("lodash");
const moment = require("moment");

function Duckie() {
  const [user, setUser] = useState("");
  const [commits, setCommits] = useState([]);
  const [quoteOrSetup, setQuoteOrSetup] = useState("");
  const [authorOrPunchline, setAuthorOrPunchline] = useState("");

  //Check if speech is available
  const speech = new Speech();
  if (speech.hasBrowserSupport()) {
    console.log("speech synthesis supported");
  }
  //Get voices list
  speech
    .init()
    .then((data) => {
      console.log("Speech is ready, voices are available", data);
    })
    .catch((e) => {
      console.error("An error occured while initializing : ", e);
    });
  //Initalize speech with voice
  speech.init({
    volume: 1,
    lang: "en-US",
    rate: 1,
    pitch: 1,
    voice: "Samantha",
    splitSentences: true,
    listeners: {
      onvoiceschanged: (voices) => {
        console.log("Event voiceschanged", voices);
      },
    },
  });

  async function textToSpeech(text) {
    speech
      .speak({
        text: text,
      })
      .then(() => {
        console.log("Success !");
      })
      .catch((e) => {
        console.error("An error occurred :", e);
      });
  }

  async function getCommits() {
    const commits = await axios.get(
      `https://api.github.com/users/${user}/events`
    );
    const push = _.filter(commits.data, { type: "PushEvent" });
    const today = _.filter(push, (obj) =>
      moment(obj.created_at).isSame(moment(), "day")
    );
    console.log(today);

    setCommits(today);
  }

  async function getJoke() {
    const { data } = await axios.get(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    );
    console.log(data[0].setup);
    setQuoteOrSetup(data[0].setup);
    await textToSpeech(data[0].setup);
    console.log(data[0].punchline);
    setAuthorOrPunchline(data[0].punchline);
    await textToSpeech(data[0].punchline);
  }

  async function getProgrammingQuote() {
    const { data } = await axios.get(
      "http://quotes.stormconsultancy.co.uk/random.json"
    );
    console.log(data.quote);
    setQuoteOrSetup(data.quote);
    await textToSpeech(data.quote);
    console.log(data.author);
    setAuthorOrPunchline(" - " + data.author);
    await textToSpeech(data.author);
  }

  async function getQuote() {
    const { data } = await axios.get("http://api.quotable.io/random");
    console.log(data.content);
    setQuoteOrSetup(data.content);
    await textToSpeech(data.content);
    console.log(data.author);
    setAuthorOrPunchline(" - " + data.author);
    await textToSpeech(data.author);
  }

  async function handleChange(event) {
    setUser(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    await getCommits();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> {quoteOrSetup}</p>
        <p> {authorOrPunchline}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p> Duckie </p>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="GitHub User"
              value={user}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Get Commit" />
        </form>
        <p> {commits.length} Commits</p>
        <button onClick={getJoke}>Get a Joke</button>
        <button onClick={getProgrammingQuote}>Get a Programming Quote</button>
        <button onClick={getQuote}>Get an Inspirational Quote</button>
        <Link to="/">
          <button> View Website </button>
        </Link>
      </header>
    </div>
  );
}

export default Duckie;
