exports.handler = (event, context) => {
  try {
    if (event.session.new) {
      // New session
      console.log('NEW SESSION')
    }

    switch (event.request.type) {
      case "LaunchRequest":
        // Launch request
        console.log(`Launch Request`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse('I am Locutus. Ask me about war, peace, or power.', true),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent request
        console.log(`Intent Request`)

        switch (event.request.intent.name) {
          case 'GetTrivia':
            var facts = [
              'The original number one or second to the captain was a woman.',
              'The vulcan salute is actually a hebrew blessing.',
              'The episodes are not in chronological order',
              'Captain Picard is the only captain seen in all eras of Federation history via time travel.'
            ]
            var trivia = facts[getRandomInt(0, 3)]
            context.succeed(
              generateResponse(
                buildSpeechletResponse(trivia, true),
                {}
              )
            )
            break;
          case 'GetKlingonPhrase':
            var phrase = ''
            switch (event.request.intent.slots.Subject.value) {
              case 'war':
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse('Revenge is a dish best served cold.', true),
                    {}
                  )
                )
                break;
              case 'peace':
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse('Peace may cost less than war, or infinitely more, for war cannot cost more than ones own life.', true),
                    {}
                  )
                )
                break;
              case 'power':
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse('Great men do not seek power. It is thrust upon them.', true),
                    {}
                  )
                )
                break;
              default:
                break;
            }
            context.succeed(
              generateResponse(
                buildSpeechletResponse(phrase, true),
                {}
              )
            )
            break;
          default:
            throw 'Invalid intent'
        }
        break;

      case "SessionEndedRequest":
        // Session end request
        console.log(`Session End Request`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)
    }
  } catch (error) { context.fail(`Exception: ${error}`) }
}

// Helpers
getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
