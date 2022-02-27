const Sequelize = require("sequelize");

console.log("Get connection ...");

const sequelize = new Sequelize({
  database: "groupomania",
  username: "root",
  password: "!F1usd100!",
  host: "localhost",
  dialect: "mysql",
});

//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = (module.exports = {});
exports.sequelize = sequelize;
