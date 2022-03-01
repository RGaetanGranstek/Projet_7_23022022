const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// Model pour l'utilisateur
const commentaire = sequelize.define(
  "commentaire",
  {
    id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    message: { type: Sequelize.STRING, allowNull: false },
    utilisateur_id: { type: Sequelize.STRING, allowNull: false },
    publication_id: { type: Sequelize.STRING, allowNull: false },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = commentaire;
