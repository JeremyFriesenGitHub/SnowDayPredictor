const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt
const router = express.Router();
var db = require('../database')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session: req.session });
});

//users
router.post('/users', function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
        var query = "SELECT * FROM GuestUser WHERE Username = ?";
        db.get(query, [username], function(error, user) {
            if (error) {
                console.error(error);
                response.send('An error occurred');
                return;
            }

            if (user) {
                bcrypt.compare(password, user.Password, function(err, result) {
                    if (err) {
                        console.error(err);
                        response.send('An error occurred during password verification');
                        return;
                    }

                    if (result) {
                        request.session.userId = user.GUId;
                        response.redirect('/dashboard');
                    } else {
                        response.render('users', { errorMessage: 'Invalid password.' });
                    }
                });
            } else {
                response.render('users', { errorMessage: 'Invalid username.' });
            }
        });
    } else {
        response.send('Please Enter Username and Password Details');
    }
});


// Admin login route
router.post('/admin', function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
        var query = "SELECT * FROM Admin WHERE Username = ?";
        db.get(query, [username], function(error, admin) {
            if (error) {
                console.error(error);
                response.send('An error occurred');
                return;
            }

            if (admin) {
                bcrypt.compare(password, admin.Password, function(err, result) {
                    if (result) {
                        // Passwords match
                        request.session.adminId = admin.Aid; // Use a different session variable for admins
                        response.redirect('/login'); // Redirect to an admin dashboard
                    } else {
                        response.render('admin', { errorMessage: 'Invalid password.' });
                    }
                });
            } else {
                response.render('admin', { errorMessage: 'Invalid username.' });
            }
        });
    } else {
        response.send('Please Enter Username and Password Details');
    }
});



router.get('/logout', function(request, response, next) {
    request.session.destroy();
    response.redirect('/');
});

module.exports = router;
