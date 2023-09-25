class OverworldMap {
  constructor(map, files) {
    this.name = map.name;
    this.overworld = null;
    this.gameObjects = map.config.gameObjects;
    // Attacher les images aux gameObjects
    for (let gameObject of this.gameObjects) {
      if (gameObject.src) {
        gameObject.blobURL = utils.findImageBlobUrl(files, gameObject.src);
      }
    }
    this.hero = null;
    this.cutsceneSpaces = map.config.cutsceneSpaces || {};
    this.walls = map.config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = utils.findImageBlobUrl(files, map.config.lowerSrc);

    this.upperImage = new Image();
    this.upperImage.src = utils.findImageBlobUrl(files, map.config.upperSrc);

    this.isCutscenePlaying = false;
    this.isPaused = false;
    //this.dataWalls = config.dataWalls || [];
  }

  drawLowerImage(ctx, cameraPerson) {
    // console.log("ctx: " +ctx);
    ctx.drawImage(
      this.lowerImage, 
      utils.withGrid(10.5) - cameraPerson.x, 
      utils.withGrid(6) - cameraPerson.y
      )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage, 
      utils.withGrid(10.5) - cameraPerson.x, 
      utils.withGrid(6) - cameraPerson.y
    )
  } 

  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  // fonction initiale
  // mountObjects() {
  //   Object.keys(this.gameObjects).forEach(key => {

  //     let object = this.gameObjects[key];
  //     object.id = key;

  //     //TODO: determine if this object should actually mount
  //     object.mount(this);

  //   })
  // }

  // fonction arkgame_v1
  mountObjects() {
      for (let i = 0; i < this.gameObjects.length; i++) {
        let config = this.gameObjects[i];

        console.log("config: "+JSON.stringify(config)); 
        //{"type":"Person","name":"hero","isPlayerControlled":true,"x":10,"y":5,"direction":"down","src":"KrRpmqmQCp",
        // "blobUrl":"blob:http://localhost:3000/75b715be-1510-477b-9a2c-811454171f8a"}

        let objectInstance;

        switch(config.type) {
          case "Person":
            objectInstance = new Person(config);
            break;
            // Ajoutez d'autres cas pour d'autres types de GameObjects si nécessaire
            default:
              throw new Error(`Unknown gameObject type: ${config.type}`);
        }

       
        
        // console.log("this.map.gameObjects: " + stringifyWithCircularCheck(this.map.gameObjects));
        // console.log("objectInstance: "+stringifyWithCircularCheck(objectInstance));
            
        objectInstance.mount(this);
        this.gameObjects[i] = objectInstance; // Remplacez l'objet de configuration par l'instance
      }
  }

  scaleWalls() {
    let wallsObject = {};
    this.walls.forEach(item => {
        const coordinates = item.split(',').map(Number);  // Convertit chaque chaîne en nombre
        const scaledCoordinates = coordinates.map(coordinate => utils.withGrid(coordinate));
        const key = scaledCoordinates.join(',');
        wallsObject[key] = true;
    });
    this.walls = wallsObject;
  }

  scaleCutsceneSpaces() {
    const scaledCutsceneSpaces = {};
    for (let coord in this.cutsceneSpaces) {
        const [x, y] = coord.split(',').map(Number);
        const scaledCoord = `${utils.withGrid(x)},${utils.withGrid(y)}`;
        scaledCutsceneSpaces[scaledCoord] = this.cutsceneSpaces[coord].map(item => {
            if (item.events) {
                item.events = item.events.map(event => {
                    if (event.x !== undefined && event.y !== undefined) {
                        event.x = utils.withGrid(event.x);
                        event.y = utils.withGrid(event.y);
                    }
                    return event;
                });
            }
            return item;
        });
    }
    this.cutsceneSpaces = scaledCutsceneSpaces;  // Mettez à jour cutsceneSpaces avec les données mises à l'échelle
  }


  extractHero() {
    const heroIndex = this.gameObjects.findIndex(object => object.isPlayerControlled);
    if (heroIndex !== -1) {
      this.hero = this.gameObjects[heroIndex];
      this.gameObjects.splice(heroIndex, 1);
    }
  }

  async startCutscene(events) {
    console.log("OverworldMap startCutscene");
    
  //   {
  //     type: "changeMap",
  //     map: "Street",
  //     x: 5,
  //     y: 10,
  //     direction: "down"
  // }

    this.isCutscenePlaying = true;

    for (let i=0; i<events.length; i++) {
      if(events[i].type === "changeMap") {
        console.log("OverworldMap startCutscene changeMap");
        console.log("events[i]: "+events[i]);
      }
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      const result = await eventHandler.init();
      if (result === "LOST_BATTLE") {
        break;
      }
    }
    this.isCutscenePlaying = false;
  }

  checkForActionCutscene() {
    const nextCoords = utils.nextPosition(this.hero.x, this.hero.y, this.hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {

      const relevantScenario = match.talking.find(scenario => {
        return (scenario.required || []).every(sf => {
          return playerState.storyFlags[sf]
        })
      })
      relevantScenario && this.startCutscene(relevantScenario.events)
    }
  }

  checkForFootstepCutscene() {
    const match = this.cutsceneSpaces[ `${this.hero.x},${this.hero.y}` ];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene( match[0].events )
    }
  }

  addWall(x,y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x,y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x,y);
  }


}
