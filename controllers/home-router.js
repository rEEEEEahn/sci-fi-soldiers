const router = require("express").Router();
const { User, Goal, Client, Post, PostQuestionAnswer, Comment, ClientServices, Services, Professional, ProfessionalServices, GoalType } = require("../models");

// use withAuth middleware to redirect from protected routes.
const withAuth = require("../util/withAuth");

router.get("/", async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ["password"],
        raw: true,
      });
    }
    res.render("home", {
      title: "Home Page",
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign-Up Page" });
});

//professsional routes
//professional profile - get one professional with user data
router.get("/professionals/:prof_id", async (req, res) => {
  try {
    const professionalData = await Professional.findByPk(req.params.prof_id, {
      include: [User, {model: ProfessionalServices, include: Services}]});
    const professional = professionalData.get({ plain: true });
    console.log(professional,null,2);
    res.render("professionalprofile", professional);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/professionals", async (req, res) => {
  const professionalData = await Professional.findAll({
    include: [User, {model: ProfessionalServices, include: Services}]
  });
  const professionals = professionalData.map((professionals) =>
  professionals.get({ plain: true })
  );
  console.log(JSON.stringify(professionals,null,2));
  res.render("professionals", { professionals });
});

// GET 	/dashboard		auth	dashboard for logged in  for professionals
router.get("/dashboard/:prof_id", withAuth, async (req, res) => {
  try {
    const professionalData = await Professional.findByPk(req.params.prof_id,{
      include: [User,{model: ProfessionalServices, include: Services},{model: Goal, include: [GoalType, {model: Post, include: PostQuestionAnswer}, {model: Client, include: User}]}]
    });
    const professional = professionalData.get({ plain: true });
    console.log(JSON.stringify(professionalData, null, 2));
    res.render("dashboard", professional);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET 	/new-goal/?clientid={{id}}		auth	Form to allow a client to add a goal. Must be logged
// GET 	/new-goal?		auth	Form to allow a client to add a goal. Must be logged
router.get("/new-goal", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
    });
    console.log(userData);
    const clientData = userData.get({ plain: true });
    res.render("newgoal", clientData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET 	/goal/:id		auth	displays page for a specific goal
router.get("/goals/:goal_id", withAuth, async (req, res) => {
  try {
    const goalData = await Goal.findByPk(req.params.goal_id, {
      include: [
        { model: Client, include: User },
        { model: Post, order: ["date", "DESC"], include: [PostQuestionAnswer, {model: Comment, include: User}] },
      ],
    });

    const goal = goalData.get({ plain: true });
    console.log(JSON.stringify(goal, null, 2));
    const currentWeight = goal.posts[0].post_question_answers[0].answer;
    console.log({ currentWeight });
    res.render("goal", { goal, currentWeight });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET 	/client			auth	displays client goals and info for logged in client
router.get("/client/:client_id", withAuth, async (req, res) => {
  try {
    const clientData = await Client.findByPk(req.params.client_id, {
      include: [User, {model: ClientServices, include: Services}, {model: Goal, include: {model: Post, order: ["date", "DESC"], include: PostQuestionAnswer}}]
    });

    const client = clientData.get({ plain: true });
    console.log(JSON.stringify(client, null, 2));
    res.render("clientprofile", { client });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
