const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our ProfessionalServices model
class ProfessionalServices extends Model {}

ProfessionalServices.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    professional_id: {
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
    modelName: "professional_services",
  }
);

module.exports = ProfessionalServices;
