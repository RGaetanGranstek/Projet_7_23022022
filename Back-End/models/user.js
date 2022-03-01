const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// model pour l'utilisateur
const User = sequelize.define(
  "utilisateur",
  {
    id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    nom: { type: Sequelize.STRING, allowNull: false },
    prenom: { type: Sequelize.STRING, allowNull: false },
    pseudo: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "UTILISATEUR",
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
