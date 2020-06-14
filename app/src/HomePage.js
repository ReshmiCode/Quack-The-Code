import React, { useState, useEffect } from "react";
import logo from "./duck0.png";
import "./App.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Quack The Code... Your Digital Coding Companion</h1>
        <p>
          Rubber duck debugging is used around the world by millions of programmers.
          As the name suggests, rubber duck debugging refers to debugging your code with the aid of a rubber duck. 
          You describe and explain each step of your code, in detail, to the duck, 
          until you notice the problem that's been causing the unexpected behavior. 
          But what if you don’t have a rubber duck? 
          Have you already heard about the rubber duck debugging and want to try a digital version? 
          Would you like to try rubber duck debugging and want your duck to also have additional functionality? 
          Introducing Quack The Duck, your very own digital rubber duck coding companion!
        </p>
        <iframe
          width="840"
          height="473"
          src="https://www.youtube.com/embed/kU_pBXSsnk4"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="Demo Video"
        ></iframe>
        <p>
          Quack The Duck is a website and desktop app which brings you all the aid of rubber duck debugging. 
          You can explain your code, line by line, to it and it sits patiently listening for you to notice your mistake. 
          If you can’t figure it on your own, it can ask you guided questions when you need help. 
          It also provides you with inspirational quotes, facts, advice, jokes, and 
          coding quizzes on the click of a button or your voice commands. 
          Along with the visual app, we also provide to you smart home speaker 
          plugins so you can get hands free help and support. 
        </p>
        <Link to="/app">
          <button
            style={{
              width: 120,
              height: 40,
              margin: 5,
              borderRadius: 20,
              backgroundColor: "#5295c7",
              border: "none",
              color: "#07002c",
            }}
          >
            {" "}
            Go to App{" "}
          </button>
        </Link>
        <h2>Commands:</h2>
        <button
            style={{
              width: 120,
              height: 40,
              margin: 5,
              borderRadius: 20,
              backgroundColor: "#5295c7",
              border: "none",
              color: "#07002c",
            }}
          >
            {" "}
            <a href="https://storage.googleapis.com/recycle-bun-macos/RecycleBunWindows.zip" target="_blank" rel="noopener noreferrer" download>
              Download for MacOS
            </a>
            {" "}
          </button>
          <button
            style={{
              width: 120,
              height: 40,
              margin: 5,
              borderRadius: 20,
              backgroundColor: "#5295c7",
              border: "none",
              color: "#07002c",
            }}
          >
            {" "}
            <a href="https://storage.googleapis.com/recycle-bun-macos/RecycleBunWindows.zip" target="_blank" rel="noopener noreferrer" download>
              Download for Windows
            </a>
            {" "}
          </button>
      </header>
    </div>
  );
}

export default HomePage;
