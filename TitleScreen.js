class TitleScreen {
  constructor({ progress }) {
    this.progress = progress;
  }


  getOptions(resolve) {
    const safeFile = this.progress.getSaveFile();
    return [
      { 
        label: "New Game",
        description: "Start a new adventure!",
        handler: () => {
          this.close();
          resolve();
          console.log("New Game")
        }
      },
      safeFile ? {
        label: "Continue Game",
        description: "Resume your adventure",
        handler: () => {
          this.close();
          resolve(safeFile);
        }
      } : null
    ].filter(v => v);
  }
  
  getDemo(resolve) {
    return [
      { 
        label: "Demo",
        description: "Start a new adventure!",
        handler: async () => {
          // Initialise the game,  the map and the first level's cutscenes dans la variable globale
          try {
            const response = await fetch(`/demo-game`);
            console.log(response);
            if (!response.status === 200){
              throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log(data);
            this.close();
            resolve(data);
            console.log("New Game - Demo")

          } catch (error) {
            console.log('Erreur TitleScreen getDemo ');
            console.error('Erreur lors de la récupération des données du joueur:', error); 

            // Message user erreur serveur indisponible 
            container.innerHTML = '<div style="color: red; font-size: 24px;">Le serveur est momentanément indisponible. Veuillez réessayer plus tard.</div>';
            return null;
          }
        }
      }
    ];
  }


  // arkgame_v2
  // voir initialisation coté overworld pour les fonctions suivantes : 
  getProgress(resolve) { }
  getConnection(resolve) { }

  

  

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TitleScreen");
    this.element.innerHTML = (`
      <img class="TitleScreen_logo" src="./images/logo.png" alt="Pizza Legends" />
    `)
  }

  close() {
    this.keyboardMenu.end();
    this.element.remove();
  }
  
  init(container) {
    return new Promise(resolve => {
      // arkgame_v2
      // Check if session exists


      this.createElement();
      // container.appendChild(this.element);
      if (container.firstChild) {
          container.insertBefore(this.element, container.firstChild);
      } else {
          container.appendChild(elem);
      }


      this.keyboardMenu = new KeyboardMenu();
      this.keyboardMenu.init(this.element);
      // this.keyboardMenu.setOptions(this.getOptions(resolve))
      this.keyboardMenu.setOptions(this.getDemo(resolve))

      // arkgame_v2
      // if user session exists
      // liste des jeux disponibles avec bouton continue
      // add buton continue dernier jeu
  
      // if user session does not exist
      // add button getConnection
    })
  }

}