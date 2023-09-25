class OverworldEvent {
  constructor({ map, event}) {
    this.map = map;
    this.event = event;
    this.zoomLevel = 1.0;
  }

  stand(resolve) {
    let who;
    if (this.event.who === 'hero') {
      who = this.map.hero;
    } else {
      who = this.map.gameObjects.find(object => object.name === this.event.who);
    }

    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    })
    
    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonStandComplete", completeHandler)
  }

  walk(resolve) {
    let who;
    if (this.event.who === 'hero') {
      who = this.map.hero;
    } else {
      who = this.map.gameObjects.find(object => object.name === this.event.who);
    }



    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    })

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)

  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })
    message.init( document.querySelector(".main") )
  }

  async changeMap(resolve) {
    console.log("OverworldEvent.changeMap");
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".main"), async () => {

      // { type: "changeMap", map: "Street", x: 5, y: 10, direction: "down" },    
      const data = await serverRequests.getChangeMap(this.event.map_id, this.event.x, this.event.y, this.event.direction);
      // console.log("data change map: "+data);
      
      this.map.overworld.startMap(data.map, {
          x: data.x,
          y: data.y,
          direction: data.direction,
      });

      // this.map.overworld.startMap( window.OverworldMaps[this.event.map], {
      //   x: this.event.x,
      //   y: this.event.y,
      //   direction: this.event.direction,
      // });

      resolve();
      sceneTransition.fadeOut();
    })
  }

  battle(resolve) {
    const battle = new Battle({
      enemy: Enemies[this.event.enemyId],
      arena: this.event.arena || null,
      onComplete: (didWin) => {
        resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
      }
    })
    battle.init(document.querySelector(".main"));

  }

  pause(resolve) {
    this.map.isPaused = true;
    const menu = new PauseMenu({
      progress: this.map.overworld.progress,
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
        this.map.overworld.startGameLoop();
      }
    });
    menu.init(document.querySelector(".main"));
  }

  addStoryFlag(resolve) {
    window.playerState.storyFlags[this.event.flag] = true;
    resolve();
  }

  craftingMenu(resolve) {
    const menu = new CraftingMenu({
      pizzas: this.event.pizzas,
      onComplete: () => {
        resolve();
      }
    })
    menu.init(document.querySelector(".main"))
  }

  drawImage(){
    document.querySelector(".main"), () => {
      this.map.overworld.startMap( window.OverworldMaps[this.event.map], {
        x: this.event.x,
        y: this.event.y,
        direction: this.event.direction,
      });
    }

    let w = canvas.width * zoomLevel;
    let h = canvas.height * zoomLevel;
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear the canvas
    ctx.drawImage(img, 0, 0, w, h);
  }
  
  zoomIn(){
    this.zoomLevel += 0.1;
    this.drawImage();
  }

  zoomOut(){
    this.zoomLevel -= 0.1;
    this.drawImage();
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)      
    })
  }

}