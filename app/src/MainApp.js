import React, { useState } from "react";
import isElectron from "is-electron";
import { Link } from "react-router-dom";
import "./App.css";
import Speech from "speak-tts";
import Speechy from "./Speech2text";
import Modal from "./Modal";
import Confetti from "react-confetti";
import Wave from "react-wavify";
import { isNan } from "speak-tts/lib/utils";
import song from "./DuckSongEdited.mp3";

const axios = require("axios");
const _ = require("lodash");
const moment = require("moment");

var styles = {
  button: {
    width: 120,
    height: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#5295c7",
    border: "none",
    color: "#07002c",
    outline: "none",
  },
};

function MainApp() {
  const [user, setUser] = useState(null);
  const [quizQues, setQuizQues] = useState(-1);
  const [commits, setCommits] = useState("Quack The Code");
  const [debugNumb, setDebugNumb] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [text, setText] = useState("");
  const [eating, setEating] = useState(false);

  async function callbackFunction(childData) {
    callMatchingFunction(childData);
  }

  //Check if speech is available
  const speech = new Speech();
  if (speech.hasBrowserSupport()) {
    console.log("speech synthesis supported");
  }
  //Initalize speech with voice
  speech
    .init({
      volume: 1,
      lang: "en-US",
      rate: 1,
      pitch: 1,
      voice: "Samantha",
      splitSentences: true,
    })
    .catch((e) => {
      console.error("An error occured while initializing : ", e);
    });

  function openWebsiteInBrower() {
    console.log("Website");
    if (isElectron()) {
      const electron = window.require("electron");
      electron.shell.openExternal("https://quack-the-code.web.app/");
    }
  }

  async function callMatchingFunction(message) {
    console.log(message);
    console.log(isElectron());
    if (message.includes("hello") || message.includes("hi"))
      await textToSpeech("Quack, hey there friend!");
    else if (message.includes("joke")) getJoke();
    else if (message.includes("programming quote")) getProgrammingQuote();
    else if (
      message.includes("inspirational quote") ||
      message.includes("inspiration") ||
      message.includes("inspire")
    )
      getQuote();
    else if (message.includes("fact")) getFact();
    else if (
      message.includes("advice") ||
      message.includes("motivation") ||
      message.includes("motivate")
    )
      giveAdvice();
    else if (message.includes("question") || message.includes("quiz"))
      getQuestion();
    else if (
      message.includes("commits") ||
      message.includes("commit") ||
      message.includes("github")
    )
      getCommits();
    else if (message.includes("answer")) checkAnswer(message);
    else if (
      message.includes("help") ||
      message.includes("debug") ||
      message.includes("next")
    )
      getHelp();
    else if (
      message.includes("fix") ||
      message.includes("thank you") ||
      message.includes("done")
    )
      endHelp();
    else if (message.includes("feed")) feedDuck();
    else if (message.includes("song")) playSong();
    else if (message.includes("quack")) await textToSpeech("Quack to you too");
    else if (message.length > 1)
      await textToSpeech("Quack I'm just a duck I don't understand!");
  }

  async function textToSpeech(text) {
    speech
      .speak({
        text: text,
      })
      .catch((e) => {
        console.error("An error occurred :", e);
      });
  }

  async function getHelp() {
    await textToSpeech(CODINGQUES[debugNumb]);
    const nextIndex = debugNumb + 1;
    if (nextIndex === CODINGQUES.length) setDebugNumb(0);
    else setDebugNumb(nextIndex);
  }

  async function endHelp() {
    await textToSpeech(
      "Glad to help, that was a very productive coding session! Nice work!"
    );
    showConfetti();
    setDebugNumb(0);
  }

  async function getCommits() {
    if (!user) {
      setCommits("Add your Github username in settings.");
      return;
    }
    const githubCommits = await axios.get(
      `https://api.github.com/users/${user}/events`
    );
    const push = _.filter(githubCommits.data, { type: "PushEvent" });
    const today = _.filter(push, (obj) =>
      moment(obj.created_at).isSame(moment(), "day")
    );
    let count = 0;
    _.forEach(today, (obj) => {
      count += obj.payload.commits.length;
    });

    setCommits(count);
    await textToSpeech("You made " + count + " commits today");
  }

  async function handleChange(event) {
    setUser(event.target.value);
  }

  async function getJoke() {
    const { data } = await axios.get(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    );
    setText(data[0].setup + "\n" + data[0].punchline);
    await textToSpeech(data[0].setup);
    await textToSpeech(data[0].punchline);
  }

  async function getProgrammingQuote() {
    const { data } = await axios.get(
      "http://quotes.stormconsultancy.co.uk/random.json"
    );
    setText(data.quote + "\n - " + data.author);
    await textToSpeech(data.quote);
    await textToSpeech(data.author);
  }

  async function getQuote() {
    const { data } = await axios.get("http://api.quotable.io/random");
    setText(data.content + "\n - " + data.author);
    await textToSpeech(data.content);
    await textToSpeech(data.author);
  }

  async function getQuestion() {
    const index = Math.floor(Math.random() * PROGQUES.length);
    setQuizQues(index);
    setText(PROGQUES[index].question);
    await textToSpeech(PROGQUES[index].question);
  }

  async function checkAnswer(message) {
    const words = message.split(" ");
    if (words.indexOf("a") != -1) {
      if (PROGQUES[quizQues].answer === "a") {
        await textToSpeech("Correct answer! Quack good job!");
        showConfetti();
      } else
        await textToSpeech(
          "Incorrect answer. The right answer was " + PROGQUES[quizQues].answer
        );
    }
    if (words.indexOf("b") != -1) {
      if (PROGQUES[quizQues].answer === "b") {
        await textToSpeech("Correct answer!");
        showConfetti();
      } else
        await textToSpeech(
          "Incorrect answer. The right answer was " + PROGQUES[quizQues].answer
        );
    }
    if (words.indexOf("c") != -1) {
      if (PROGQUES[quizQues].answer === "c") {
        await textToSpeech("Correct answer!");
        showConfetti();
      } else
        await textToSpeech(
          "Incorrect answer. The right answer was " + PROGQUES[quizQues].answer
        );
    }
    if (words.indexOf("d") != -1) {
      if (PROGQUES[quizQues].answer === "d") {
        await textToSpeech("Correct answer!");
        showConfetti();
      } else
        await textToSpeech(
          "Incorrect answer. The right answer was " + PROGQUES[quizQues].answer
        );
    }
  }

  function showConfetti() {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 9000);
  }

  async function getFact() {
    const index = Math.floor(Math.random() * PROGFACTS.length);
    setText(PROGFACTS[index].fact);
    await textToSpeech(PROGFACTS[index].fact);
  }

  async function giveAdvice() {
    const { data } = await axios.get("https://api.adviceslip.com/advice");
    setText(data.slip.advice + "\n - Your Code Companion ♥");
    await textToSpeech(data.slip.advice);
  }

  async function playSong() {
    console.log("Playing");
    const duckSong = new Audio(song);
    await duckSong.play();
    // async function playSound (audioFile) {
    //   audioFile.play();
    // };
    // await playSound(duckSong);
    console.log("Played");
  }

  function feedDuck() {
    if (!isNaN(commits)) {
      const foodLeft = commits - 1;
      setCommits(foodLeft);
      setEating(true);
      setTimeout(() => setEating(false), 1450);
    } else setCommits("Sync your commits.");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ position: "absolute", top: "0px", left: "25px" }}>
          <p>
            {commits}
            {!isNaN(commits) ? " Breadcrumbs" : ""}
          </p>
        </div>
        <Modal user={user} changeUser={handleChange} />
        {confetti && <Confetti width={window.width} height={window.height} />}
        <p style={{ "white-space": "pre-wrap" }}>{text}</p>
        <Speechy parentCallback={callbackFunction} eating={eating} />
        <Wave
          fill="url(#gradient)"
          style={{ marginTop: -120 }}
          options={{
            height: 50,
            amplitude: 40,
          }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="10%" stopColor="#bee1ee" />
              <stop offset="90%" stopColor="#1e76ab" />
            </linearGradient>
          </defs>
        </Wave>

        <div style={{ flexDirection: "row" }}>
          <button style={styles.button} onClick={getCommits}>
            Sync Github Commits
          </button>
          <button style={styles.button} onClick={feedDuck}>
            Feed the Duck (in commits)
          </button>
          <button style={styles.button} onClick={getJoke}>
            Programming Joke
          </button>
          <button style={styles.button} onClick={getProgrammingQuote}>
            Programming Quote
          </button>
          <button style={styles.button} onClick={getQuote}>
            Inspirational Quote
          </button>
          <button style={styles.button} onClick={getQuestion}>
            Programming Question
          </button>
          <button style={styles.button} onClick={giveAdvice}>
            Motivation & Advice
          </button>
          <button style={styles.button} onClick={getFact}>
            Programming Fact
          </button>
          <button style={styles.button} onClick={playSong}>
            Play The Duck Song
          </button>
          {isElectron() ? (
            <button style={styles.button} onClick={openWebsiteInBrower}>
              {" "}
              View Website in Browser{" "}
            </button>
          ) : (
            <Link to="/">
              <button style={styles.button}> Go To Home Page </button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default MainApp;

const CODINGQUES = [
  "Hello, let's get quacking! Can you describe the problem? Please use small sentences, I am only a duck.",
  "Can you explain what the function, object, or thing is that is not working?",
  "Is there any chance you could break this down into smaller parts?",
  "So does it just do one thing? Any chance you could test it seperately?",
  "Do you fully understand what it does? Do you need to research any parts?",
  "What parts of it are you certain work and what are your unknowns?",
  "Is it being compiled? Can you restart the complier or build?",
  "Could it, or the variables in it, be overriden?",
  "Sorry, my super-duck-powers have failed. Have you tried google or stack overflow? This debugging session will end.",
];

const PROGQUES = [
  {
    question:
      "What is a syntax error?\nA. An error due to incorrect logic.\nB. An error due to the language rules being broken.\nC. An error you will never find.\nD. An error caused by bad network connection.",
    answer: "b",
  },
  {
    question:
      "What is FIFO?\nA. First in Few Out.\nB. Fade in fade out.\nC. First in first out.\nD. False in fact out.",
    answer: "c",
  },
  {
    question:
      "What is a short section of code made to complete a task?\nA. A function.\nB. A buffer.\nC. An array.\nD. A variable.",
    answer: "a",
  },
  {
    question:
      "What data type holds a single letter or number?\nA. Word.\nB. Double.\nC. Integer.\nD. Character.",
    answer: "d",
  },
];

const PROGFACTS = [
  {
    fact:
      "The first programmer in the world was a woman. Her name was Ada Lovelace and she worked on an analytical engine back in the 1,800’s.",
  },
  {
    fact:
      "Recent studies have shown that over 70% of coding jobs are in fields outside of technology.",
  },
  {
    fact: "The first computer virus was created in 1983.",
  },
  {
    fact: "The first computer game was created in 1961.",
  },
  {
    fact:
      'The word computer "bug" was inspired by a real bug. It was founded by Grace Hopper in 1947.',
  },
  {
    fact:
      "Nowadays, there are over 700 different programming languages. All experts recommend for kids to start with a visual editor and a blockly based programming language for them to learn in a smoother and easier way.",
  },
  {
    fact:
      "The first programming language (per sé) was called Fortran, and it was created in the ’50s.",
  },
  {
    fact:
      "Almost any powered with electricity needs to be coded. Can you imagine?!",
  },
  {
    fact:
      "Since many programming languages share the same structure, it is easy for students to learn a new programming language once they have already mastered one before.",
  },
  {
    fact:
      "Computers run on binary code, which means that their software is written using only 1s and 0s.",
  },
  {
    fact:
      "Learning coding has stunning cognitive-related benefits, such as problem-solving, computational thinking, analytical thinking, creative thinking, leadership-related skills, and even teamwork.",
  },
  {
    fact:
      "In the near future knowing how to code will be as necessary as knowing how to write is today. Yes, regardless of the field or career your students decide for their future.",
  },
];
