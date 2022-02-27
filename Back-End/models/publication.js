const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

// Model pour l'utilisateur
module.exports = (sequelize, DataTypes) => {
  class publication extends Model {}
  publication.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      utilisateur_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      titre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      message: {
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
      modelName: "publication",
    }
  );
  return publication;
};
