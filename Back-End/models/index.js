const { sequelize } = require("../config/sequelize.js");
// Connexion à la base de donnée MySQL
sequelize.authenticate()
    .then(() => {
        console.log("Connection établi avec succés.");
    })
    .catch((err) => {
        console.error("Impossible de se connecter à la BDD:", err);
    });

const db = {};

// Modèles et tables
db.User = require("./user.js");
db.Publication = require("./publication.js");
db.Commentaire = require("./commentaire.js");


// Relations entre les différentes tables
db.User.hasMany(db.Publication, { foreignKey: 'utilisateur_id' });
db.User.hasMany(db.Commentaire, { foreignKey: 'utilisateur_id' });

db.Publication.belongsTo(db.User, { foreignKey: 'utilisateur_id' }, {
    onDelete: 'CASCADE',
    hooks: true
});
db.Publication.hasMany(db.Commentaire, { foreignKey: 'publication_id' });

db.Commentaire.belongsTo(db.User, { foreignKey: 'utilisateur_id' });

db.Commentaire.belongsTo(db.Publication, { foreignKey: 'publication_id' }, {
    onDelete: 'CASCADE',
    hooks: true
});

module.exports = db