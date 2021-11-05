const router = require('express').Router();
const { User, Goal } = require('../models');

// use withAuth middleware to redirect from protected routes.
const withAuth = require("../util/withAuth");

router.get('/', async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ['password'],
        raw: true,
      });
    }
    res.render('home', {
      title: 'Home Page',
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Log-In Page' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign-Up Page' });
});

//professsional routes
router.get('/professionals/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    console.log(userData);
    const professionalData = userData.get({ plain: true });
    res.render('professionalprofile', professionalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/professionals", async (req, res) => {
    const userData = await User.findAll();
    const professionalData = userData.map((professionalData) => professionalData.get({ plain: true }));
    console.log(professionalData);
    res.render('professionals', {users:professionalData});
  });

 
  // GET 	/new-goal/?clientid={{id}}		auth	Form to allow a client to add a goal. Must be logged 
  // GET 	/new-goal?		auth	Form to allow a client to add a goal. Must be logged 
  router.get("/goals", withAuth, async (req, res) => {
    try{
      const userData = await User.findByPk(req.session.userId, {
        attributes: {exclude:["password"]},
      });
      console.log(userData);
      const clientData = userData.get({ plain: true });
      res.render('goals', clientData);
    } catch (err) { 
      res.status(500).json(err);
    }
  })
     
  // GET 	/dashboard		auth	dashboard for logged in pro
  router.get("/dashboard/id", withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id);
      console.log(userData);
      const clientData = userData.get({ plain: true });
      res.render('dashboard', clientData);
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
  router.get("/client/id", withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id);
      console.log(userData);
      const clientData = userData.get({ plain: true });
      res.render('clientprofile', clientData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/client", async (req, res) => {
      const userData = await User.findAll();
      const clientData = userData.map((clientData) => clientData.get({ plain: true }));
      console.log(clientData);
      res.render('clientprofile', {users:clientData});
    });
    

module.exports = router;
