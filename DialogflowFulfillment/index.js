// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const axios = require("axios");
const _ = require("lodash");
const moment = require("moment");
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Hello fellow coder!`);
  }
  
    function getCommits(agent) {
      //agent.add("Commit Intent");
      const user = agent.parameters.user;
      //agent.add(user);
      const url = "https://api.github.com/users/" + user  + "/events" ;
      return axios.get(url)
      .then((result) => {
        var count = 0;
        agent.add(count);
        const push = _.filter(result.data, { type: "PushEvent" });
        const today = _.filter(push, (obj) => moment(obj.created_at).isSame(moment(), "day"));
        _.forEach(today, (obj) => {
          count += obj.payload.commits.length;
        });
        //agent.add(count);
      });
  }
  
  function getJoke(agent) {
    //agent.add("Joke Intent");
    return axios.get("https://official-joke-api.appspot.com/jokes/programming/random")
    .then((result) => {
      result.data.map(joke => {
        	agent.add(joke.setup);
        	agent.add(joke.punchline);
        });
    });
  }
  
  function getProgrammingQuote(agent) {
    //agent.add("Programming Quote Intent");
    return axios.get("http://quotes.stormconsultancy.co.uk/random.json")
      .then((result) => {
      //agent.add(result);
      agent.add(result.data.quote);
      agent.add(result.data.author);
    });
  }
  
  function getQuote(agent) {
    //agent.add("Inspirational Quote Intent");
    return axios.get("http://api.quotable.io/random")
    .then((result) => {
      agent.add(result.data.content);
      agent.add(result.data.author);
    });
  }
  
  function getAdvice(agent) {
    //agent.add("Advice Intent");
    return axios.get("https://api.adviceslip.com/advice")
    .then((result) => {
      agent.add(result.data.slip.advice);
    });
  }
  
  function getFact() {
    //agent.add("Fact Intent");
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
    const index = Math.floor(Math.random() * PROGFACTS.length);
    agent.add(PROGFACTS[index].fact);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  //function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!'); // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  intentMap.set('Joke Intent', getJoke);
  intentMap.set('Programming Quote Intent', getProgrammingQuote);
  intentMap.set('Inspirational Quote Intent', getQuote);
  intentMap.set('Fact Intent', getFact);
  intentMap.set('Advice Intent', getAdvice);
  intentMap.set('Commit Intent', getCommits);
  agent.handleRequest(intentMap);
});
