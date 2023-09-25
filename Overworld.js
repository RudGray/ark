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
      const cameraPerson = this.map.hero;


      //Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map
        })
      })
      //Update the hero
      this.map.hero.update({
        arrow: this.directionInput.direction,
        map: this.map
      })
      

      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })
      //Draw Hero
      this.map.hero.sprite.draw(this.ctx, cameraPerson);

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

 startMap(map, files, heroInitialState=null) {
  this.map = new OverworldMap(map, files);
  this.map.overworld = this;
  this.map.mountObjects();
  this.map.scaleWalls();
  this.map.extractHero();

  // console.log("hero x : "+this.map.hero.x)

  function stringifyWithCircularCheck(obj) {
    const seen = new Set();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Cyclic object]';
        }
        seen.add(value);
      }
      return value;
    });
  }

  // console.log("heroInitialState: "+JSON.stringify(heroInitialState))
  console.log("hero: "+stringifyWithCircularCheck(this.map.hero))
  if (heroInitialState) {
    // const {hero} = this.map.gameObjects;


// console.log("this.map.gameObjects: " + stringifyWithCircularCheck(this.map.gameObjects));
    
    

    this.map.removeWall(this.map.hero.x, this.map.hero.y);
    this.map.hero.x = heroInitialState.x;
    this.map.hero.y = heroInitialState.y;
    this.map.hero.direction = heroInitialState.direction;
    this.map.addWall(this.map.hero.x, this.map.hero.y);
  }

  // console.log("hero x : "+this.map.hero.x)

  this.progress.mapName = map.name;
  this.progress.map_id = map.map_id;
  this.progress.startingHeroX = this.map.hero.x;
  this.progress.startingHeroY = this.map.hero.y;
  this.progress.startingHeroDirection = this.map.hero.direction;

  // console.log("hero x : "+this.map.hero.x)
  // console.log("config person game object : "+stringifyWithCircularCheck(this.map.hero))

  // console.log("window.game : "+stringifyWithCircularCheck(window.game))
  // console.log("window.map : "+stringifyWithCircularCheck(window.map))
  
 }


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
  // const useSaveFile = await this.titleScreen.init(container);
  const dataGame = await this.titleScreen.init(container);
 

  //Potentially load saved data
  let initialHeroState = null;
  // if (dataGame) {
  //   console.log("dataGame: "+JSON.stringify(dataGame))
    
  //   this.progress.loadFromLocalStorage();
  //   initialHeroState = {
  //     x: this.progress.startingHeroX || 0,
  //     y: this.progress.startingHeroY || 0,
  //     direction: this.progress.startingHeroDirection || "down",
  //   }
  // }
  // if (!dataGame) {
  //   // Traitez le cas où useSaveFile est undefined. Par exemple, utilisez une valeur par défaut ou arrêtez l'initialisation.

  //   console.log("Erreur : Le serveur est momentanément indisponible.");
  //   return;
  // }

  //Load the HUD
  this.hud = new Hud();
  this.hud.init(container);

  // arkgame_v2 : Start Game : sélection du jeu


  // Start the first map
  // this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState );
  this.startMap(window.map, window.files, initialHeroState );

  //Create controls
  this.bindActionInput();
  this.bindHeroPositionCheck();

  this.directionInput = new DirectionInput();
  this.directionInput.init();

  //Kick off the game!
  this.startGameLoop();


 }
}