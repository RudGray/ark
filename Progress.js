/**
 * Cette classe permet de sauvegarder la progression du joueur.
 * 
 * La sauvegarde des autres données du jeu (comme les données de la carte) 
 * devrait être gérée par une autre classe.
 * 
 */
class Progress {
  constructor() {
    // this.mapName = "kitchen";
    // this.startingHeroX = 0;
    // this.startingHeroY = 0;
    // this.startingHeroDirection = "down";
    this.mapName;
    this.map_id;
    this.startingHeroX;
    this.startingHeroY
    this.startingHeroDirection;
    this.saveFileKey = "Arkgame_SaveFile1";
  }

  saveToLocalStorage() {
    window.localStorage.setItem(this.saveFileKey, JSON.stringify({
      mapName: this.mapName,
      startingHeroX: this.startingHeroX,
      startingHeroY: this.startingHeroY,
      startingHeroDirection: this.startingHeroDirection,
      playerState: {
        pizzas: playerState.pizzas,
        lineup: playerState.lineup,
        items: playerState.items,
        storyFlags: playerState.storyFlags
      }
    }))
  }

  getSaveFile() {
     try {
        const file = window.localStorage.getItem(this.saveFileKey);
        return file ? JSON.parse(file) : null  
     } catch {
        return null;
     }
  }
  
  loadFromLocalStorage() {
    const file = this.getSaveFile();
    if (file) {
      this.mapName = file.mapName;
      this.startingHeroX = file.startingHeroX;
      this.startingHeroY = file.startingHeroY;
      this.startingHeroDirection = file.startingHeroDirection;
      Object.keys(file.playerState).forEach(key => {
        playerState[key] = file.playerState[key];
      })
    }
  }

  loadFromGlobal() {
    this.mapName = window.Map.mapName;
    this.startingHeroX = window.game.startingHeroX;
    this.startingHeroY = window.game.startingHeroY;
    this.startingHeroDirection = window.game.startingHeroDirection;
    // Object.keys(window.game.playerState).forEach(key => {
    //   playerState[key] = window.game.playerState[key];
    // })
    console.log("loadFromGlobal , this.mapName : "+this.mapName)
  }

  loadMap(mapName) {
    console.log("loadMap , mapName : "+mapName)
    this.mapName = mapName;
    this.saveToLocalStorage();
  }

}