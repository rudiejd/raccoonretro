const express = require('express');
const router = express.Router();
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId;

// Get all sprints (probably don't need to limit)
router.route('/sprints').get(async function (_req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection('sprints')
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send('Error fetching sprints!');
        } else {
          res.json(result);
        }
      });
});

// Get one sprint by id
router.route('/sprints/:sprintId').get(async function (req, res) {
    const dbConnect = dbo.getDb();
    const requestedId = req.params.sprintId;
  
    dbConnect
      .collection('sprints')
      .findOne({_id: new ObjectId(requestedId)}, function (err, result) {
        if (err) {
          res.status(400).send('Error fetching sprint!'); } else {
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
router.route("/sprints/:sprintId/cards").post(function (req, res) {
  const dbConnect = dbo.getDb();
  console.log(req);
  // get category from query body (start, stop, continue)
  const category = req.body.card.category;
  const newCardID = new ObjectId(); 

  dbConnect
    .collection("sprints")
    .updateOne({_id: req.params.sprintId}, {
      $set: {
        cards: {
          newCardID: req.body.card
        }
      }
    }, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating sprint with id ${req.params.sprintId}!`);
      } else {
        console.log(`Sprint added card ${req.body.card.desc}`);
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
router.route("/sprints/:sprintId/cards/:cardId").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const sprintId = req.params.sprintId;
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
      name: req.body.name,
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
