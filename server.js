const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Parse = require('parse/node');
const ejs = require('ejs');
const fs = require('fs');
require('dotenv').config();


// les variables d'environnement
const API_ID = process.env.API_ID;
const JS_KEY = process.env.JAVASCRIP_ID;


Parse.initialize(APP_ID, JAVASCRIP_ID);
Parse.serverURL="https://parseapi.back4app.com";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Configuration du middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Répertoire pour les fichiers statiques
app.use(express.static(path.join(__dirname, '.')));

// Route par défaut
app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'chemin-vers-votre-dossier-de-jeu/nom-de-votre-fichier-principal.html'));
    res.sendFile(path.join(__dirname, './index.html'));
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
