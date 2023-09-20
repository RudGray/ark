class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }

 /**
  * Starts the game loop and keeps it going until the game is paused  or stopped 
  * 
  * 
  * @returns {void}
  * @memberof Overworld 
  * 
  * 
  */
  startGameLoop() {
    this.how = this.element.querySelector(".how-to-play");
    this.how.style.display = "none";
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;


      //Update all objects
      //console.log(this.map.gameObjects);
      Object.values(this.map.gameObjects).forEach(object => {
        console.log("-------------------");

        //console.log("obj: "+object);
        //console.log("dir: "+this.directionInput.direction);
        object.update({
          arrow: this.directionInput.direction,
          map: this.map
        })
      })
      

      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);
      
      if (!this.map.isPaused) {
        requestAnimationFrame(() => {
          step();
        })
      }
    }
    step();
 }

 bindActionInput() {
   new KeyPressListener("Enter", () => {
     //Is there a person here to talk to?
     this.map.checkForActionCutscene()
   })
   new KeyPressListener("Escape", () => {
     if (!this.map.isCutscenePlaying) {
      this.map.startCutscene([
        { type: "pause" }
      ])
     }
   })
 }

 bindHeroPositionCheck() {
   document.addEventListener("PersonWalkingComplete", e => {
     if (e.detail.whoId === "hero") {
       //Hero's position has changed
       this.map.checkForFootstepCutscene()
     }
   })
 }

 startMap(mapConfig, heroInitialState=null) {
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.mountObjects();

  if (heroInitialState) {
    const {hero} = this.map.gameObjects;
    this.map.removeWall(hero.x, hero.y);
    hero.x = heroInitialState.x;
    hero.y = heroInitialState.y;
    hero.direction = heroInitialState.direction;
    this.map.addWall(hero.x, hero.y);
  }

  this.progress.mapId = mapConfig.id;
  this.progress.startingHeroX = this.map.gameObjects.hero.x;
  this.progress.startingHeroY = this.map.gameObjects.hero.y;
  this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;

 }
/*
 async fetchPlayerData(playerId) {
  try {
    const response = await fetch(`http://your-express-server.com/player-data/${playerId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données du joueur:', error);
    throw error;
  }
}
*/

 /** 
  * Initializes the game and starts the first map 
  * @param {void}
  * @returns {void}
  * @memberof Overworld
  * 
 */
 async init() {

  // Initilalisation des variables globales
  // Jeu
  window.game = {};
  

  // const container = document.querySelector(".game-container");
  const container = document.querySelector(".main");

  // // Supposez que vous avez un playerId (vous pouvez l'obtenir d'une manière ou d'une autre, peut-être stocké localement)
  // const playerId = 'someUniqueId';
  // const playerData = await this.fetchPlayerData(playerId);

  // // À partir des données reçues, vous pourriez ajuster la manière dont vous initialisez le jeu. Par exemple:
  // if (playerData.useSaveFile) {
  //   this.progress = new Progress(playerData.saveData); // Si vous souhaitez initialiser Progress avec les données sauvegardées
  // } else {
  //   this.progress = new Progress();
  // }

  //Create a new Progress tracker
  this.progress = new Progress();

  //Show the title screen
  this.titleScreen = new TitleScreen({
    progress: this.progress
  })
  const useSaveFile = await this.titleScreen.init(container);


  //Potentially load saved data
  let initialHeroState = null;
  if (useSaveFile) {
    console.log("useSaveFile: "+useSaveFile)
    this.progress.load();
    initialHeroState = {
      x: this.progress.startingHeroX,
      y: this.progress.startingHeroY,
      direction: this.progress.startingHeroDirection,
    }
  }
  if (!useSaveFile) {
    // Traitez le cas où useSaveFile est undefined. Par exemple, utilisez une valeur par défaut ou arrêtez l'initialisation.

    console.log("Erreur : Le serveur est momentanément indisponible.");
    return;
  }

  //Load the HUD
  this.hud = new Hud();
  this.hud.init(container);

  // ark: Setup window.OverworldMaps
  window.OverworldMaps = {};

  console.log(" this.progress: "+ JSON.stringify(this.progress)) // kitchen

  console.log(" this.progress.mapId: "+this.progress.mapId) // kitchen
  // console.log(" initialHeroState: "+JSON.stringify(initialHeroState)) // {"x":0,"y":0,"direction":"down"}
  console.log("window.OverworldMaps[this.progress.mapId] :", window.OverworldMaps[this.progress]);
  console.log("window.OverworldMaps:", window.OverworldMaps); // objet vide

  //Start the first map
  this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState );

  //Create controls
  this.bindActionInput();
  this.bindHeroPositionCheck();

  this.directionInput = new DirectionInput();
  this.directionInput.init();

  //Kick off the game!
  this.startGameLoop();


  // this.map.startCutscene([
  //   { type: "battle", enemyId: "beth" }
  //   // { type: "changeMap", map: "DemoRoom"}
  //   // { type: "textMessage", text: "This is the very first message!"}
  // ])

 }
}