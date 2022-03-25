const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// Model pour l'utilisateur
const publication = sequelize.define(
  "publication",
  {
    id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    titre: { type: Sequelize.STRING, allowNull: false },
    message: { type: Sequelize.TEXT, allowNull: false },
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

module.exports = publication;
