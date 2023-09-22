map = {
    kitchen: {
        lowerSrc: "jEJevBBwvq",
        upperSrc: "YPOVI1ZIUd",
        gameObjects: [
            {
                type: "Person",
                name: "hero",
                isPlayerControlled: true,
                x: 10,
                y: 5,
                direction: "down",
                src: "KrRpmqmQCp"
            },
            {
                type: "Person",
                name: "kitchenNpcA",
                x: 9,
                y: 5,
                direction: "up",
                src: "ftVHA4zkPn",
                talking: [
                    {
                        events: [{ type: "textMessage", text: "** They don't want to talk to you **"}]
                    }
                ]
            },
            {
                type: "Person",
                name: "kitchenNpcB",
                x: 3,
                y: 6,
                src: "RdcOoQecEQ",
                talking: [
                    {
                        events: [{ type: "textMessage", text: "People take their jobs here very seriously.", faceHero: "kitchenNpcB" }]
                    }
                ]
            }   
        ],
        cutsceneSpaces: {
        ["5,10"]: [
            {
            events: [
                { 
                type: "changeMap", 
                map: "DiningRoom",
                x: 7,
                y: 3,
                direction: "down"
                }
            ]
            }
        ],
        ["10,6"]: [{
            disqualify: ["SEEN_INTRO"],
            events: [
            { type: "addStoryFlag", flag: "SEEN_INTRO"},
            { type: "textMessage", text: "* You are chopping ingredients on your first day as a Pizza Chef at a famed establishment in town. *"},
            { type: "walk", who: "kitchenNpcA", direction: "down"},
            { type: "stand", who: "kitchenNpcA", direction: "right", time: 200},
            { type: "stand", who: "hero", direction: "left", time: 200},
            { type: "textMessage", text: "Ahem. Is this your best work?"},
            { type: "textMessage", text: "These pepperonis are completely unstable! The pepper shapes are all wrong!"},
            { type: "textMessage", text: "Don't even get me started on the mushrooms."},
            { type: "textMessage", text: "You will never make it in pizza!"},
            { type: "stand", who: "kitchenNpcA", direction: "right", time: 200},
            { type: "walk", who: "kitchenNpcA", direction: "up"},
            { type: "stand", who: "kitchenNpcA", direction: "up", time: 300},
            { type: "stand", who: "hero", direction: "down", time: 400},
            { type: "textMessage", text: "* The competition is fierce! You should spend some time leveling up your Pizza lineup and skills. *"},
            {
                type: "changeMap",
                map: "Street",
                x: 5,
                y: 10,
                direction: "down"
            },
            ]
        }]
        },
        walls: [
            "2,4", "3,4", "5,4", "6,4", "7,4", "8,4", "11,4", "11,5", "12,5", "1,5", 
            "1,6", "1,7", "1,9", "2,9", "6,7", "7,7", "9,7", "10,7", "9,9", "10,9", 
            "3,10", "4,10", "6,10", "7,10", "8,10", "11,10", "12,10", "0,8", "5,11", 
            "4,3", "9,4", "10,4", "13,6", "13,7", "13,8", "13,9"
        ]
    }
}