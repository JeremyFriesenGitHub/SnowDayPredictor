//constants
const express = require('express');
const router = express.Router();
const db = require('../database');

//feedback route
router.post('/submit-feedback', (req, res) => {
    //error
    if (!req.session.userId) {
      res.redirect('/users');
      return;
    }
  
    const feedbackText = req.body.feedbackText;
    const userId = req.session.userId; 
  
    //query feedback
    const query = "INSERT INTO Feedback (Text, GUId) VALUES (?, ?)";
    db.run(query, [feedbackText, userId], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while submitting feedback');
        return;
      }
  
      //go back to inital dashboard
      res.redirect('/dashboard');
    });
  });

 //export route
module.exports = router;