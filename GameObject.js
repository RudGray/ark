/**
 * data pour Person
 * {"type":"Person","name":"hero","isPlayerControlled":true,"x":10,"y":5}
 */

class GameObject {
  constructor(config) {
    this.type = config.type || "GameObject";
    this.name = config.name || "unnamed";
    this.isMounted = false;
    // this.x = config.x || 0;
    // this.y = config.y || 0;
    this.x = utils.withGrid(config.x) || 0;
    this.y = utils.withGrid(config.y) || 0;
    this.direction = config.direction || "down";
    console.log("config in constructor GameObjrvy: "+JSON.stringify(config));

    this.sprite = new Sprite({
      gameObject: this,
      // src: config.blobUrl || "./images/characters/people/hero.png",
      src: config.blobURL
    });

    //These happen once on map startup.
    //Characters will pause after a cutscene is triggered, but will resume activity when reentering the map
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    this.talking = config.talking || [];
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    //If we have a behavior, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10)
  }

  update() {
    // voir la classe Person
  }

  async doBehaviorEvent(map) { 

    //Don't do anything if there is a more important cutscene or I don't have config to do anything
    //anyway.
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return;
    }

    //Setting up our event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.name;

    //Create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init(); 

    //Setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    } 

    //Do it again!
    this.doBehaviorEvent(map);
    

  }


}