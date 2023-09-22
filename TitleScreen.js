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
            const data = await serverRequests.getDemoInit();
            // const response = await fetch(`/demo-game-init`);
            
            // // Vérifier si le statut de la réponse est différent de 200 (OK)
            // if (!response.status === 200){
            //   throw new Error(response.statusText);
            // }
            // const data = await response.json();
            // // console.log("data:   ", data);
            
            // // Vérifier si les données du jeu et de la carte sont présentes dans la réponse du serveur
            // const dataChecks = {
            //   game: "Game data is missing from server response.",
            //   map: "Map data is missing from server response.",
            //   files: "Files data is missing from server response."
            // };
            // for (let key in dataChecks) {
            //     if (!data[key]) {
            //         throw new Error(dataChecks[key]);
            //     }
            // }

            // // Stocker les données du jeu et de la carte dans les variables globales window
            // window.game = data.game;
            // window.map = data.map;
            // window.files = data.files;
            
            // this.progress.loadMap(data.map.name);
            // console.log(" progress : "+JSON.stringify(this.progress))

            // Conversion des fichiers base64 en blobs et création des URL d'objet
            // if (data.files && Array.isArray(data.files)) {
            //   for(let i=0; i<data.files.length; i++){
            //     const blob = utils.dataURLtoBlob(data.files[i].fileBase64);
            //     const blobURL = URL.createObjectURL(blob);
                
            //     data.files[i]["blobURL"] = blobURL;
            //   };
            // }

            this.close();
            resolve(data);

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