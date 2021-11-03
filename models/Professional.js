const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Professional model
class Professional extends Model {}

Professional.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calendly: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "professional",
  }
);

module.exports = Professional;
