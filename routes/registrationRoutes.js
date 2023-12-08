//constants
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const db = require('../database');
const express = require('express');
const router = express.Router();

//registration route
router.post('/', async (req, res) => {
    //error
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send("Username and password are required.");
        }

        //add username and hashed password to the database
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query = `INSERT INTO GuestUser (Username, Password) VALUES (?, ?)`;
        db.run(query, [username, hashedPassword], (error) => {
            if (error) {
                if (error.code === 'SQLITE_CONSTRAINT') {
                    //could change this to render, won't do it bcz not testing the testcase
                    return res.status(409).render('register', { errorMessage: 'Username already exists' });
                } else {
                    return res.status(500).send("An error occurred during registration.");
                }
            }
            //go to login form
            res.redirect('/users');
        });
        //error
    } catch (error) {
        console.error(error);
        res.status(500).send("An internal server error occurred.");
    }
});

module.exports = router;
