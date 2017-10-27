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
          case 'GetVideoGame':
            var phrase = ''
            switch (event.request.intent.slots.VideoGame.value) {
              case 'wolfenstien 2':
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse('Wolfenstein II: The New Colossus is an action-adventure shooter game played from a first-person perspective. To progress through the story, players battle enemies throughout levels. The game utilizes a health system in which players health is divided into separate sections that regenerate; if an entire section is lost, players must use a health pack to replenish the missing health.[2] Players use melee attacks, firearms, and explosives to fight enemies, and may run, jump, and occasionally swim to navigate through the locations. Melee attacks can be used to silently take down enemies without being detected. Alternatively, players can ambush enemies, which often results in an intense firefight between the two parties. Enemy commanders can call for reinforcements several times.', true),
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
