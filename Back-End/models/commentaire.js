const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// Model pour l'utilisateur
module.exports = (sequelize, DataTypes) => {
  class commentaire extends Model {}
  commentaire.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      utilisateur_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publication_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "commentaire",
    }
  );
  return commentaire;
};
