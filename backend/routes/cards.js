const express = require('express');
const router = express.Router();
const dbo = require('../db/conn')

// Get cards (probably don't need to limit)
router.route('/cards').get(async function (_req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection('cards')
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send('Error fetching cards!');
        } else {
          res.json(result);
        }
      });
});

// Create a card
router.route('/cards').post(function (req, res) {
    const dbConnect = dbo.getDb();
    const cardDocument = {
      color: req.body.color,
      id: req.body.id,
      description: req.body.description,
      status: req.body.status,
      title: req.body.title,
    };
  
    dbConnect
      .collection('cards')
      .insertOne(cardDocument, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting card!');
        } else {
          res.status(204).send();
        }
      });
});
module.exports = router;
