const Alexa = require("ask-sdk-core");
const axios = require("axios");

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
    const response = await getJoke();
    return (
      handlerInput.responseBuilder
        .speak(response[0].setup + " " + response[0].punchline)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

async function getJoke() {
  const { data } = await axios.get(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  return data;
}
