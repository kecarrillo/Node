const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

// Register Form
router.get('/register', function (req, res) {
    res.render('register');
});

// Register Proccess
router.post('/register', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password:password
        });


        newUser.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                res.redirect('/users/login');
            }
        });
    }    
});

// Login Form
router.get('/login', function (req, res) {
    // res.send('Login');
    res.render('login');
});

// Login Process
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;
