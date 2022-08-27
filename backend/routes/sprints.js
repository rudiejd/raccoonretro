const express = require('express');
const router = express.Router();
const dbo = require('../db/conn')

// Get all sprints (probably don't need to limit)
router.route('/sprints').get(async function (_req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection('sprints')
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

// Add a card to a sprint
/**
 * Example document: 
 * {
 *  id: '543ffr59495',
 *  card: {
 *    desc: 'Keep doing this'
 *    category: 'continue',
 *    likes: 0
 *  }
 * }
 */
router.route("/sprints/addCard").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const sprintQuery = { _id: req.body.id };
  // get category from query body (start, stop, continue)
  const category = req.body.category;
  const updates = {
    $set: {
      category: req.body.card
    }
  };

  dbConnect
    .collection("sprints")
    .updateOne(sprintQuery, updates, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating sprint with id ${sprintQuery.id}!`);
      } else {
        console.log(`Sprint ${sprintQuery.id} updated`);
      }
    });
});

/**
 * Update an existing card from a sprint
 * Example document: 
 * {
 *  id: '54395843958f',
 *  card: {
 *    id: '43i54385ugj'
 *    desc: 'Keep doing this'
 *    category: 'continue' 
 *    likes: 0
 *  }
 * }
 */
router.route("/sprints/updateCard").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const sprintId = req.body.id;
  const sprintQuery = { _id: sprintId };
  const updatedCard = req.body.card; 
  const updatedCardID = req.body.card.id;
  const updates = {
    $set: {
      cards: {
        updatedCardID: updatedCard 
      }
    }
  };

  dbConnect
    .collection("sprints")
    .updateOne(sprintQuery, updates, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating card in sprint with id ${sprintId}!`);
      } else {
        console.log(`Sprint ${sprintQuery.id} updated card ${updatedCardId}`);
      }
    });
});


// Create a sprint
router.route('/sprints').post(function (req, res) {
    const dbConnect = dbo.getDb();
    const sprintDocument = {
      cards: {}, 
      notes: {},
    };
  
    dbConnect
      .collection('sprints')
      .insertOne(sprintDocument, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting sprint!');
        } else {
          res.status(204).send();
        }
      });
});

module.exports = router;
