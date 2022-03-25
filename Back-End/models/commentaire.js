const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// Model pour l'utilisateur
const commentaire = sequelize.define(
  "commentaire",
  {
    id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    message: { type: Sequelize.TEXT, allowNull: false },
    publication_id: { type: Sequelize.BIGINT, allowNull: false, references: { model: "publication", key: "id" } },
    utilisateur_id: { type: Sequelize.BIGINT, allowNull: false, references: { model: "utilisateur", key: "id" } },
    imageUrl: {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = commentaire;
