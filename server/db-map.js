{
    "lowerSrc": "jEJevBBwvq",
    "upperSrc": "YPOVI1ZIUd",
    "gameObjects": [
      {
        "type": "Person",
        "name": "hero",
        "isPlayerControlled": true,
        "x": 10,
        "y": 5,
        "direction": "down",
        "src": "KrRpmqmQCp"
      },
      {
        "type": "Person",
        "name": "kitchenNpcA",
        "x": 9,
        "y": 5,
        "direction": "up",
        "src": "ftVHA4zkPn",
        "talking": [
          {
            "events": [
              {
                "type": "textMessage",
                "text": "** They don't want to talk to you **"
              }
            ]
          }
        ]
      },
      {
        "type": "Person",
        "name": "kitchenNpcB",
        "x": 3,
        "y": 6,
        "src": "RdcOoQecEQ",
        "talking": [
          {
            "events": [
              {
                "type": "textMessage",
                "text": "People take their jobs here very seriously.",
                "faceHero": "kitchenNpcB"
              }
            ]
          }
        ]
      }
    ],
    "cutsceneSpaces": {
      "4,4": [
        {
          "events": [
            {
              "type": "changeMap",
              "map": "DiningRoom",
              "x": 7,
              "y": 3,
              "direction": "down"
            }
          ]
        }
      ],
      "5,10": [
        {
          "events": [
            {
                "type": "changeMap",
                "map": "street",
                "map_id":"yBSGVDkAtO",
                "x": 5,
                "y": 10,
                "direction": "down"
            }
          ]
        }
      ],
      "8,5": [
        {
          "disqualify": [
            "SEEN_INTRO"
          ],
          "events": [
            {
              "type": "addStoryFlag",
              "flag": "SEEN_INTRO"
            },
            {
              "type": "textMessage",
              "text": "* You are chopping ingredients on your first day as a Pizza Chef at a famed establishment in town. *"
            },
            {
              "type": "walk",
              "who": "kitchenNpcA",
              "direction": "down"
            },
            {
              "type": "stand",
              "who": "kitchenNpcA",
              "direction": "right",
              "time": 200
            },
            {
              "type": "stand",
              "who": "hero",
              "direction": "left",
              "time": 200
            },
            {
              "type": "textMessage",
              "text": "Ahem. Is this your best work?"
            },
            {
              "type": "textMessage",
              "text": "These pepperonis are completely unstable! The pepper shapes are all wrong!"
            },
            {
              "type": "textMessage",
              "text": "Don't even get me started on the mushrooms."
            },
            {
              "type": "textMessage",
              "text": "You will never make it in pizza!"
            },
            {
              "type": "stand",
              "who": "kitchenNpcA",
              "direction": "right",
              "time": 200
            },
            {
              "type": "walk",
              "who": "kitchenNpcA",
              "direction": "up"
            },
            {
              "type": "stand",
              "who": "kitchenNpcA",
              "direction": "up",
              "time": 300
            },
            {
              "type": "stand",
              "who": "hero",
              "direction": "down",
              "time": 400
            },
            {
              "type": "textMessage",
              "text": "* The competition is fierce! You should spend some time leveling up your Pizza lineup and skills. *"
            },
            {
              "type": "changeMap",
              "map": "street",
              "map_id":"yBSGVDkAtO",
              "x": 5,
              "y": 10,
              "direction": "down"
            }
          ]
        }
      ]
    },
    "walls": [
      "2,4",
      "3,4",
      "5,4",
      "6,4",
      "7,4",
      "8,4",
      "11,4",
      "11,5",
      "12,5",
      "1,5",
      "1,6",
      "1,7",
      "1,9",
      "2,9",
      "6,7",
      "7,7",
      "9,7",
      "10,7",
      "9,9",
      "10,9",
      "3,10",
      "4,10",
      "6,10",
      "7,10",
      "8,10",
      "11,10",
      "12,10",
      "0,8",
      "5,11",
      "4,3",
      "9,4",
      "10,4",
      "13,6",
      "13,7",
      "13,8",
      "13,9"
    ]
  }


  {
    "lowerSrc": "2AzIwATv8I",
    "upperSrc": "1VHqgfzL2C",
    "gameObjects": [
      {
        "type": "Person",
        "name": "hero",
        "isPlayerControlled": true,
        "x": 30,
        "y": 10
      },
      {
        "type": "Person",
        "name": "streetNpcA",
        "x": 9,
        "y": 11,
        "src": "QpdEMxVjRAg",
        "behaviorLoop": [
          { "type": "stand", "direction": "right", "time": 1400 },
          { "type": "stand", "direction": "up", "time": 900 }
        ],
        "talking": [
          {
            "events": [
              { "type": "textMessage", "text": "All ambitious pizza chefs gather on Anchovy Avenue.", "faceHero": "streetNpcA" }
            ]
          }
        ]
      },
      {
        "type": "Person",
        "name": "streetNpcB",
        "x": 31,
        "y": 12,
        "src": "riwdKMdzj6",
        "behaviorLoop": [
          { "type": "stand", "direction": "up", "time": 400 },
          { "type": "stand", "direction": "left", "time": 800 },
          { "type": "stand", "direction": "down", "time": 400 },
          { "type": "stand", "direction": "left", "time": 800 },
          { "type": "stand", "direction": "right", "time": 800 }
        ],
        "talking": [
          {
            "events": [
              { "type": "textMessage", "text": "I can't decide on my favorite toppings.", "faceHero": "streetNpcB" }
            ]
          }
        ]
      },
      {
        "type": "Person",
        "name": "streetNpcC",
        "x": 22,
        "y": 10,
        "src": "RpGt6SMMCLg",
        "talking": [
          {
            "required": ["streetBattle"],
            "events": [
              { "type": "textMessage", "text": "You are quite capable.", "faceHero": "streetNpcC" }
            ]
          },
          {
            "events": [
              { "type": "textMessage", "text": "You should have just stayed home!", "faceHero": "streetNpcC" },
              { "type": "battle", "enemyId": "streetBattle" },
              { "type": "addStoryFlag", "flag": "streetBattle"}
            ]
          }
        ]
      }
    ],
    "walls": ["4,9", "5,8", "6,9", "7,9", "8,9", "9,9", "10,9", "11,9", "12,9", "13,8", "14,8", "15,7",
      "16,7", "17,7", "18,7", "19,7", "20,7", "21,7", "22,7", "23,7", "24,7", "24,6", "24,5", "26,5", "26,6", "26,7", "27,7", "28,8", "28,9", "29,8", "30,9", "31,9", "32,9", "33,9",
      "16,9", "17,9", "25,9", "26,9", "16,10", "17,10", "25,10", "26,10", "16,11", "17,11", "25,11", "26,11",
      "18,11","19,11",
      "4,14", "5,14", "6,14", "7,14", "8,14", "9,14", "10,14", "11,14", "12,14", "13,14", "14,14", "15,14", "16,14", "17,14", "18,14", "19,14", "20,14", "21,14", "22,14", "23,14",
      "24,14", "25,14", "26,14", "27,14", "28,14", "29,14", "30,14", "31,14", "32,14", "33,14",
      "3,10", "3,11", "3,12", "3,13", "34,10", "34,11", "34,12", "34,13",
        "29,8","25,4"
    ],
    "cutsceneSpaces": {
      "5,9": [
        {
          "events": [
            {
              "type": "changeMap",
              "map": "DiningRoom",
              "x": 6,
              "y": 12,
              "direction": "up"
            }
          ]
        }
      ],
      "29,9": [
        {
          "events": [
            {
              "type": "changeMap",
              "map": "Shop",
              "x": 5,
              "y": 12,
              "direction": "up"
            }
          ]
        }
      ],
      "25,5": [
        {
          "events": [
            {
              "type": "changeMap",
              "map": "StreetNorth",
              "x": 7,
              "y": 16,
              "direction": "up"
            }
          ]
        }
      ]
    }
  }
  