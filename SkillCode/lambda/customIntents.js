const Alexa = require("ask-sdk-core");
const axios = require("axios");
const data = require("./data");

exports.HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Hello World!";
    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

exports.JokeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "JokeIntent"
    );
  },
  async handle(handlerInput) {
    const joke = await getJoke();
    return (
      handlerInput.responseBuilder
        .speak(joke)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

exports.InspQuoteIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "InspQuoteIntent"
    );
  },
  async handle(handlerInput) {
    const response = await getInspQuote();
    return (
      handlerInput.responseBuilder
        .speak(response)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

exports.ProgQuizIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ProgQuizIntent"
    );
  },
  handle(handlerInput) {
    const index = Math.floor(Math.random() * data.PROGQUES.length);
    return (
      handlerInput.responseBuilder
        .speak(data.PROGQUES[index].question)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

exports.ProgFactIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ProgFactIntent"
    );
  },
  handle(handlerInput) {
    const index = Math.floor(Math.random() * data.PROGFACTS.length);
    return (
      handlerInput.responseBuilder
        .speak(data.PROGFACTS[index].fact)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

exports.AdviceIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AdviceIntent"
    );
  },
  async handle(handlerInput) {
    const response = await giveAdvice();
    return (
      handlerInput.responseBuilder
        .speak(response)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

exports.ProgQuoteIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ProgQuoteIntent"
    );
  },
  async handle(handlerInput) {
    const response = await getProgrammingQuote();
    return (
      handlerInput.responseBuilder
        .speak(response)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

async function getJoke() {
  const { data } = await axios.get(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  return data[0].setup + " " + data[0].punchline;
}

async function getInspQuote() {
  const { data } = await axios.get("http://api.quotable.io/random");
  return data.content + " Said by " + data.author;
}

async function giveAdvice() {
  const { data } = await axios.get("https://api.adviceslip.com/advice");
  return data.slip.advice;
}

async function getProgrammingQuote() {
  const { data } = await axios.get(
    "http://quotes.stormconsultancy.co.uk/random.json"
  );
  return data.quote + " Said by  " + data.author;
}
