const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// Model pour l'utilisateur
const publication = sequelize.define(
  "publication",
  {
    id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    utilisateur_id: { type: Sequelize.STRING, allowNull: false },
    titre: { type: Sequelize.STRING, allowNull: false },
    message: { type: Sequelize.STRING, allowNull: false },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = publication;
