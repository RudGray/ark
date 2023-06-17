const express = require('express');
const path = require('path');
const app = express();

// Répertoire pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'chemin-vers-votre-dossier-de-jeu')));

// Route par défaut
app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'chemin-vers-votre-dossier-de-jeu/nom-de-votre-fichier-principal.html'));
    res.sendFile(path.join(__dirname, './index.html'));
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
