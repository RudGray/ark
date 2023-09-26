const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Parse = require('parse/node');
const ejs = require('ejs');
const fs = require('fs');
require('dotenv').config();
const parser = require('./data-parser.js');


// les variables d'environnement
Parse.initialize(process.env.APP_ID, process.env.JAVASCRIPT_ID);
Parse.serverURL="https://parseapi.back4app.com";


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Configuration du middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Répertoire pour les fichiers statiques
app.use(express.static(path.join(__dirname, '../.')));
app.use(express.json()); // to support JSON-encoded bodies

// Route par défaut
app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'chemin-vers-votre-dossier-de-jeu/nom-de-votre-fichier-principal.html'));
    res.sendFile(path.join(__dirname, '../index.html'));
});


app.post('/get-cutscene-events', async (req, res) => {
    const { x, y } = req.body;
  
    const Cutscene = Parse.Object.extend("Cutscene");
    const query = new Parse.Query(Cutscene);
    query.equalTo("x", x);
    query.equalTo("y", y);
  
    try {
      const cutscene = await query.first();
      if (cutscene) {
        res.json(cutscene.get('events'));
      } else {
        res.status(404).send('Cutscene not found.');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
});

app.get('/player-data/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    // Utilisez playerId pour récupérer les données du joueur depuis la base de données
    // Par exemple:
    const playerData = await getDatabaseDataForPlayer(playerId);  // à définir selon votre setup
    res.json(playerData);
});

app.get('/demo-game-init', async (req, res) => {
  console.log("demo-game-init")
  
  try {
    // téléchargement du jeu legeend
    const DemoGame = Parse.Object.extend("DemoGame");
    const demoGameQuery = new Parse.Query(DemoGame);
    demoGameQuery.equalTo("name", "legend");
    const demoGame = await demoGameQuery.first();
    // console.log("demoGame :   ", demoGame)
    
    if (!demoGame) {
        throw new Error("Game not found.");
    }

    // téléchargement de la première map du jeu legend
    const DemoMap = Parse.Object.extend("DemoMap");
    const demoMapQuery = new Parse.Query(DemoMap);
    demoMapQuery.equalTo("game_id", demoGame);  // Utilisez l'objet game directement
    demoMapQuery.equalTo("level", 0);
    const demoMap = await demoMapQuery.first();
    // console.log("demoMap :   ", demoMap)
    
    if (!demoMap) {
      throw new Error("Map not found.");
    }
    
    // télécharger les fichiers de la première map du jeu legend
    const DemoFiles = Parse.Object.extend("DemoFiles");
    const demoFilesQuery = new Parse.Query(DemoFiles);
    demoFilesQuery.equalTo("map_id", demoMap);
    const mapFiles = await demoFilesQuery.find();
    // console.log("mapFiles :   ", mapFiles)

    // Télécharger les fichiers de la première map du jeu legend et les convertir en base64
    const mapFilesPromises = mapFiles.map(async (file) => {
      // console.log("file :   ", file.toJSON() )
      const fileUrl = file.get("file")._url;  // Remplacez "fileUrl" par le vrai nom de l'attribut si différent
      // console.log("fileUrl :   ", fileUrl )
      // console.log("fileUrl._url :   ", fileUrl._url )
      const fileBase64 = await parser.getFileAsBase64(fileUrl);
      
      const fileObject = file.toJSON();
      fileObject.fileBase64 = fileBase64;  // Ajoutez le fichier en base64 à l'objet
      return fileObject;
    });

    const mapFilesWithBase64 = await Promise.all(mapFilesPromises);

    // renvoyez le JSON comme vous l'avez fait précédemment, mais ajoutez les fichiers
    res.json({ 
      game: demoGame.toJSON(), 
      map: demoMap.toJSON(), 
      files: mapFilesWithBase64 
    });

  } catch (error) {
    console.log("error /demo-game-init: ", error);
    res.status(500).send(error.message);
  }
});

// {game, map_id, x, y, direction}
app.post('/get-change-map', async (req, res) => {
  // console.log("get change map")
  // console.log("req.body :   ", req.body)
  
  try {
    // téléchargement de la première map du jeu legend
    const DemoMap = Parse.Object.extend("DemoMap");
    const demoMapQuery = new Parse.Query(DemoMap);
    const demoMap = await demoMapQuery.get(req.body.map_id);
    // console.log("demoMap :   ", demoMap)
    
    if (!demoMap) {
      throw new Error("Map not found.");
    }
    
    // télécharger les fichiers de la première map du jeu legend
    const DemoFiles = Parse.Object.extend("DemoFiles");
    const demoFilesQuery = new Parse.Query(DemoFiles);
    demoFilesQuery.equalTo("map_id", demoMap);
    const mapFiles = await demoFilesQuery.find();
    // console.log("mapFiles :   ", mapFiles)

    // Télécharger les fichiers de la première map du jeu legend et les convertir en base64
    const mapFilesPromises = mapFiles.map(async (file) => {
      // console.log("file :   ", file.toJSON() )
      const fileUrl = file.get("file")._url;  // Remplacez "fileUrl" par le vrai nom de l'attribut si différent
      // console.log("fileUrl :   ", fileUrl )
      // console.log("fileUrl._url :   ", fileUrl._url )
      const fileBase64 = await parser.getFileAsBase64(fileUrl);
      
      const fileObject = file.toJSON();
      fileObject.fileBase64 = fileBase64;  // Ajoutez le fichier en base64 à l'objet
      return fileObject;
    });

    const mapFilesWithBase64 = await Promise.all(mapFilesPromises);

    // renvoyez le JSON comme vous l'avez fait précédemment, mais ajoutez les fichiers
    res.json({ 
      map: demoMap.toJSON(), 
      files: mapFilesWithBase64 
    });

  } catch (error) {
    console.log("error /get change map : ", error);
    res.status(500).send(error.message);
  }
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));





/*

refais moi un exemple uniquement avec Game :

les propriétés sont : 
- isDemo boolean
- but : string : objectif final du jeu
- contexte : string : mise en contexte du jeu pour une meilleurs immersion du joueur
- name : string : nom du jeu


voici la route express
réécris le en entier avec tes modifictions


app.get('/demo-game', async (req, res) => {
  
  // Définir la classe "Game"
  const Game = Parse.Object.extend("Game");

  // Créer une nouvelle requête pour la classe Game
  const gameQuery = new Parse.Query(Game);
  console.log("gameQuery: " + gameQuery);

  try { 

    // Compter le nombre d'objets Game
    const count = await gameQuery.count();
    
    console.log("count: " + count)
    // Renvoyer le nombre d'objets Game
    res.send(`Total number of Game objects: ${count}`);


  } catch (error) {
      console.log("error /demo-game:");
    console.log(error);
    res.status(500).send(error.message);
  }
})

*/