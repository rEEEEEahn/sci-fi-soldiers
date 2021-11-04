const router = require('express').Router();
const { User } = require('../models');

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

 
  // GET 	/new-goal?		auth	Form to allow a client to add a goal. Must be logged 
  router.get("/new-goal", withAuth, async (req, res) => {
    res.end();
  });
  // GET 	/dashboard		auth	dashboard for logged in pro
  router.get("/dashboard", withAuth, async (req, res) => {
    res.end();
  });
  // GET 	/goal/:id		auth	displays page for a specific goal
  router.get("/goal/:id", withAuth, async (req, res) => {
    res.end();
  });
  // GET 	/client			auth	displays client goals and info for logged in client
  router.get("/client", withAuth, async (req, res) => {
    res.end();
  });

module.exports = router;
