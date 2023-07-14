const express = require('express');
const path = require('path');
const app = express();
var Parse = require('parse/node');

// la deuxième clé est une clé de compte utilisateur back4app, spécialement créée pour ce projet
Parse.initialize("4f58d833-4dc8-4ca2-bd19-3dc4dc4c75b5", "84NEosmgaXPVvhW8EaWuSMbd8yPmosBkbnauIQLn");
Parse.serverURL = 'https://YOUR_PARSE_SERVER_URL/parse'


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
