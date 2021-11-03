const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Question model
class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question_type: {
      type: DataTypes.ENUM({
        values: ['setup', 'progress']
      })
    },
    goal_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "question",
  }
);

module.exports = Question;
