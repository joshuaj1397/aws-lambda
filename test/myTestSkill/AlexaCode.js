{
  "intents": [
    {
      "name": "AMAZON.CancelIntent",
      "samples": []
    },
    {
      "name": "AMAZON.HelpIntent",
      "samples": []
    },
    {
      "name": "AMAZON.StopIntent",
      "samples": []
    },
    {
      "name": "GetTrivia",
      "samples": [
        "to tell me a fact",
        "a fact",
        "tell me a fact"
      ],
      "slots": []
    },
    {
      "name": "GetVideoGame",
      "samples": [
        "tell me about {VideoGame}",
        "to tell me about {VideoGame}",
        "about {VideoGame}"
      ],
      "slots": [
        {
          "name": "VideoGame",
          "type": "AMAZON.VideoGame",
          "samples": []
        }
      ]
    }
  ]
}
