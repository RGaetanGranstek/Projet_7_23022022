const Sequelize = require("sequelize");

// Pour lire les fichiers .env
require("dotenv").config({ path: process.cwd() + "/.env.sample" });

console.log("Get connection ...");

const sequelize = new Sequelize({
  database: process.env.bdd_nom,
  username: process.env.bdd_login,
  password: process.env.bdd_password,
  host: process.env.bdd_host,
  dialect: "mysql",
});

//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = (module.exports = {});
exports.sequelize = sequelize;
