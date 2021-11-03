const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our ClientServices model
class ClientServices extends Model {}

ClientServices.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    services_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "client_services",
  }
);

module.exports = ClientServices;
