var Sequelize = require("sequelize");

console.log("Get connection ...");

var sequelize = new Sequelize({
  database: "groupomania",
  username: "root",
  password: "!F1usd100!",
  host: "localhost",
  dialect: "mysql",
});

// console.log(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection établi avec succés.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la BDD:", err);
  });

//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = (module.exports = {});
exports.sequelize = sequelize;
