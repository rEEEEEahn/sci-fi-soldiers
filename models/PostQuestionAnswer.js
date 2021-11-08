const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our ClientServices model
class PostQuestionAnswer extends Model {}

PostQuestionAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer_after: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post_question_answer",
  }
);

module.exports = PostQuestionAnswer;
