require("dotenv").config();
const sequelize = require("../config/connection");
const { User, Services, Role, ProfessionalServices, Professional, GoalType, Goal, ClientServices, Client, Post, Comment, Question, PostQuestionAnswer } = require("../models");

const userData = require("./userData.json");
const roleData = require("./roleData.json");
const servicesData = require("./servicesData.json");
const goalTypeData = require("./goalTypeData.json");
const clientData = require("./clientData.json");
const professionalData = require("./professionalData.json");
const professionalServicesData = require("./professionalServicesData.json");
const clientServicesData = require("./clientServicesData.json");
const goalData = require("./goalData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");
const questionData = require("./questionData.json");
const postQuestionAnswerData = require("./postQuestionAnswerData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await Role.bulkCreate(roleData, {
      individualHooks: true,
      returning: true,
    });
    await Services.bulkCreate(servicesData, {
      individualHooks: true,
      returning: true,
    });
    await GoalType.bulkCreate(goalTypeData, {
      individualHooks: true,
      returning: true,
    });
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await Professional.bulkCreate(professionalData, {
      individualHooks: true,
      returning: true,
    });
    await ProfessionalServices.bulkCreate(professionalServicesData, {
      individualHooks: true,
      returning: true,
    });
    await Client.bulkCreate(clientData, {
      individualHooks: true,
      returning: true,
    });
    await ClientServices.bulkCreate(clientServicesData, {
      individualHooks: true,
      returning: true,
    });
    await Goal.bulkCreate(goalData, {
      individualHooks: true,
      returning: true,
    });
    await Post.bulkCreate(postData, {
      individualHooks: true,
      returning: true,
    });
    await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    });
    await Question.bulkCreate(questionData, {
      individualHooks: true,
      returning: true,
    });
    await PostQuestionAnswer.bulkCreate(postQuestionAnswerData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Finished seeding database.");
  } catch (error) {
    console.error(error);
    console.error(
      "An error occurred attempting to seed the database. Scroll up for additional details."
    );
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

seedDatabase();
