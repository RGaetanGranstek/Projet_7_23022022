const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// Model pour l'utilisateur
module.exports = (sequelize, DataTypes) => {
  class utilisateur extends Model {}
  utilisateur.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      administrateur: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "utilisateur",
    }
  );
  return utilisateur;
};
