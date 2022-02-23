// importation d'express et (body-parser pour rendre le corp de la requête exploitable en le transformant en objet javascript).
const express = require("express");
// importation du routeur
const publicationRoutes = require("./routes/publication");
// importation du routeur
const commentaireRoutes = require("./routes/commentaire");
// importation du routeur login
const userRoutes = require("./routes/user");
// importation de node qui donne accés au chemin du système de fichier
const path = require("path");
// Importation de xss clean
const xssClean = require("xss-clean");
// importation de helmet pour la sécurisation des entêtes
const helmet = require("helmet");

//création d'une constante pour l'application
const app = express();

// Ces headers permettent :
// - d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// - d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// - d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// applique les middleware d'helmet
app.use(helmet());
// Transforme les données arrivant des requêtes POST en objet JSON (body-parser intégré à express)
app.use(express.json());
// Connectez le middleware pour nettoyer les entrées utilisateur provenant du corps POST, des requêtes GET et des paramètres d’URL, Protection contre les attaques XSS
app.use(xssClean());

// route des images
app.use("/images", express.static(path.join(__dirname, "images")));
// mise en place du début de la route et pour cette route ont utilise le routeur publicationRoutes
app.use("/api/publications", publicationRoutes);
// mise en place du début de la route et pour cette route ont utilise le routeur commentaireRoutes
app.use("/api/commentaire", commentaireRoutes);
// mise en place route pour l'authentification
app.use("/api/auth", userRoutes);

// on exporte l'application (notre constante app)
module.exports = app;
