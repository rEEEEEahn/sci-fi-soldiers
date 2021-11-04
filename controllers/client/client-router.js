const { User } = require('../../models');

const router = require('express').Router();


router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    console.log(userData);
    const clientData = userData.get({ plain: true });
    res.render('professionalprofile', clientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    const userData = await User.findAll();
    const professionalData = userData.map((professionalData) => professionalData.get({ plain: true }));
    console.log(professionalData);
    res.render('professionals', {users:professionalData});
  });

module.exports = router;
