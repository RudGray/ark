const serverRequests = {




    async getDemoInit() {
        try {
            const response = await fetch('/demo-game-init');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            // console.log("data:   ", data);
            
            // Vérifier si les données du jeu et de la carte sont présentes dans la réponse du serveur
            const dataChecks = {
                game: "Game data is missing from server response.",
                map: "Map data is missing from server response.",
                files: "Files data is missing from server response."
            };
            for (let key in dataChecks) {
                if (!data[key]) {
                    throw new Error(dataChecks[key]);
                }
            }

            // Stocker les données du jeu et de la carte dans les variables globales window
            window.game = data.game;
            window.map = data.map;
            window.files = data.files;

            if (data.files && Array.isArray(data.files)) {
                for(let i=0; i<data.files.length; i++){
                  const blob = utils.dataURLtoBlob(data.files[i].fileBase64);
                  const blobURL = URL.createObjectURL(blob);
                  
                  data.files[i]["blobURL"] = blobURL;
                };
            }

            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données du demo:', error);
            throw error;  // Propagez l'erreur pour que l'appelant puisse la gérer
        }
    },

    // { type: "changeMap", map: "Street", x: 5, y: 10, direction: "down" },
    async getChangeMap(map_id, x, y, direction) {
    
        try {
            // const response = await fetch('/get-change-map', {map_id, x, y, direction});
            const response = await fetch('/get-change-map', {
                method: 'POST', // ou 'GET'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ map_id, x, y, direction }),  // pour les requêtes POST
            });
            
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            // console.log("data:   ", data);
            
            // Vérifier si les données du jeu et de la carte sont présentes dans la réponse du serveur
            const dataChecks = {
                
                map: "Map data is missing from server response.",
                files: "Files data is missing from server response."
            };
            for (let key in dataChecks) {
                if (!data[key]) {
                    throw new Error(dataChecks[key]);
                }
            }

            // Stocker les données du jeu et de la carte dans les variables globales window
            
            window.map = data.map;
            window.files = data.files;

            if (data.files && Array.isArray(data.files)) {
                for(let i=0; i<data.files.length; i++){
                  const blob = utils.dataURLtoBlob(data.files[i].fileBase64);
                  const blobURL = URL.createObjectURL(blob);
                  
                  data.files[i]["blobURL"] = blobURL;
                };
            }

            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données du demo:', error);
            throw error;  // Propagez l'erreur pour que l'appelant puisse la gérer
        }
        
    }



}

