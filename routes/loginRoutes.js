var express = require('express');
var router = express.Router();
var db = require('../database'); // Use the database connection from your database.js

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session: req.session });
});

router.post('/login', function(request, response, next) {
    var user_name = request.body.user_name; // Use consistent variable names
    var user_password = request.body.user_password;

    if (user_name && user_password) {
        var query = "SELECT * FROM user_login WHERE user_name = ?";
        db.get(query, [user_name], function(error, user) {
            if (error) {
                // Proper error handling
                console.error(error);
                response.send('An error occurred');
                return;
            }

            if (user) {
                // TODO: Implement hashed password comparison here
                // For now, using plain text comparison (not recommended)
                if (user.user_password === user_password) {
                    request.session.userId = user.user_id;
                    response.redirect('/');
                } else {
                    response.send('Incorrect Password');
                }
            } else {
                response.send('Incorrect User Name');
            }
        });
    } else {
        response.send('Please Enter User Name and Password Details');
    }
});

router.get('/logout', function(request, response, next) {
    request.session.destroy();
    response.redirect('/');
});

module.exports = router;
