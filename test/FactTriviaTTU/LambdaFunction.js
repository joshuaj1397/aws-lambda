'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.39e74de1-24ca-4e41-8e5b-7169e521b92e';

const SKILL_NAME = 'Texas Tech Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a texas tech fact, or, you can say exit... What can I help you with?'
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'Texas Tech was founded on February 10th, 1923.',
    "Texas Tech's Computer Science Department holds more than 400 students.",
    'Hack West Texas is coming in Spring 2018.',
    'TTU ACM is the best student organization on campus.',
    'Texas Tech is home to Lubbock, Texas.',
]

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
}

const handlers = {
    'LaunchRequest': function() {
        this.emit('GetFactIntent');
    },
    'GetFactIntent': function() {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function(){
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function(){
        this.response.speak(STOP_MESSAGE);
        this.emit(':reponseReady');
    },
    'AMAZON.StopIntent': function(){
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
