const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// create our Professional model
class Professional extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}

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
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      beforeCreate: async (newProfessionalData) => {
        newProfessionalData.password = await bcrypt.hash(newProfessionalData.password, 10);
        return newProfessionalData;
      },
      beforeUpdate: async (newProfessionalData) => {
        newProfessionalData.password = await bcrypt.hash(
          newProfessionalData.password,
          10
        );
        return newProfessionalData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "professional",
  }
);

module.exports = Professional;
