const router = require('express').Router();
const { Client } = require('../../models');

router.get('/dashboard', (req, res) => {
    // find all clients
    
    Client.findAll({
      attributes: ['id','user_id'],
    })
    .then(dbClientData => res.json(dbClientData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  // get one client
  router.get('/:id', (req, res) => {
    // find a single client by their `id`
    Client.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'user_id'],
    })
    .then(dbClientData => {
      if (!dbClientData) {
        res.status(404).json({ message: "Client not found"});
        return;
      }
      res.json(dbClientData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.delete('/:id', (req, res) => {
    // delete one client by their `id` 
    Client.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbClientData => {
      if (!dbClientData) {
        res.status(404).json({ message: 'Client not found'});
        return;
      }
      res.json(dbClientData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  module.exports = router;
  