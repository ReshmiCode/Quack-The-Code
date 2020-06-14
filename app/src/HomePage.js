import React, { useState, useEffect } from "react";
import logo from "./duck0.png";
import "./App.css";
import { Link } from "react-router-dom";

var styles = {
  button: {
    width: 120,
    height: 45,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#5295c7",
    border: "none",
    color: "#07002c",
  },
};

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quack The Code</h1>
        <h2>Your Digital Rubber Duck Coding Companion</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Rubber duck debugging is used around the world by millions of
          programmers. As the name suggests, rubber duck debugging refers to
          debugging your code with the aid of a rubber duck. You describe and
          explain each step of your code, in detail, to the duck, until you
          notice the problem that's been causing the unexpected behavior. But
          what if you don’t have a rubber duck? Have you already heard about the
          rubber duck debugging and want to try a digital version? Would you
          like to try rubber duck debugging and want your duck to also have
          additional functionality? Introducing Quack The Code, your very own
          digital rubber duck coding companion!
        </p>
        <p>
          Quack The Code is a website and desktop app which brings you all the
          aid of rubber duck debugging. You can explain your code, line by line,
          to it and it sits patiently listening for you to notice your mistake.
          If you can’t figure it on your own, it can ask you guided questions
          when you need help. It also provides you with inspirational quotes,
          facts, advice, jokes, and coding quizzes on the click of a button or
          your voice commands. Along with the visual app, we also provide to you
          smart home speaker plugins so you can get hands free help and support.
        </p>
        <Link to="/app">
          <button style={styles.button}> Go to App </button>
        </Link>
        <h2>Sample Commands:</h2>
        <p>"Help me debug this" To get debugging help</p>
        <p>"Tell me a joke" To get a programming joke</p>
        <p>"Tell me a programming quote" To get a programming quote</p>
        <p>"Tell me an inspitational quote" To get an inspitational quote</p>
        <p>"Inspire Me" To get an inspitational quote</p>
        <p>"Tell me a fact" To get a programming fact</p>
        <p>
          "How many commits did I make?" To get the number of commits that you
          made today
        </p>
        <div style={{ flexDirection: "row" }}>
          <button style={styles.button}>
            {" "}
            <a
              href="https://storage.googleapis.com/quack-the-code/Quack%20The%20Code.zip"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download for MacOS
            </a>{" "}
          </button>
          <button style={styles.button}>
            {" "}
            <a
              href="https://storage.googleapis.com/quack-the-code/Quack%20The%20Code.exe"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download for Windows
            </a>{" "}
          </button>
          <button style={styles.button}>
            {" "}
            <a href="https://assistant.google.com/services/invoke/uid/00000097827472c9?hl=en"
              target="_blank"
              rel="noopener noreferrer">
                Ask Google to Talk To Quack The Duck
            </a>{" "}
          </button>
        </div>
        <p>
          Made with 💖 by Megan Tran, Reshmi Ranjith, Saloni Shivdasani, and
          Vincent Vu
        </p>
        <div style={{ flexDirection: "row" }}>
          <button style={styles.button}>
            {" "}
            <a
              href="https://devpost.com/software/quack-the-code"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              More Info (Devpost)
            </a>{" "}
          </button>
          <button style={styles.button}>
            {" "}
            <a
              href="https://github.com/ReshmiCode/Coding-Companion"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              View Source Code
            </a>{" "}
          </button>
          <button style={styles.button}>
            {" "}
            <a
              href="mailto:hackathon.dream.team.utd@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Contact the Developers
            </a>{" "}
          </button>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
