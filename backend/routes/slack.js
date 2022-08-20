const express = require('express');
const router = express.Router();
const dbo = require('../db/conn')

/**
 * General slack command route
 * - create a note
 * - start a retro in a channel?
 * - voting stuff later? 
 */
router.route('/slack').post(function(req, res) {
    res.json({response_type: 'in_channel', text: 'Note added'});
    const dbConnect = dbo.getDb();
    const noteDocument = {
      text: req.body.text,
      user: req.body.userid,
      complete: false
    };
  
    dbConnect
      .collection('notes')
      .insertOne(cardDocument, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting note!');
        } else {
          res.status(204).send();
        }
      });
})

router.route('/slack/interactive').post(function(req, res) {
    console.log(req);
    res.json({response_type: 'in_channel', text: 'Come on come on get down with the sickness'});
})

module.exports = router;