'use strict';

const express = require('express');
const validator = require('validator');
const passport = require('passport');
const path = require('path');

const router = new express.Router();
var User = require('../models/user');


/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

// POST Signup
router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});


// POST Login
router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    // Log user into session
    req.login(userData, function(err) {
          if (err) { return next(err); }

          console.log(req.user);
          return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
          });
        });
  })(req, res, next);
});


/* FACEBOOK */

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/auth/success', failureRedirect: '/'}), function(req, res) {
      var user = req.user;
      var token = token;
      // Need to accept three parameters here: err, token, user
      // Token is signed in passport-facebook.js and then passed here, where it's returned in the JSON response.... shit maybe not. Might have to store it with the user data
      
      //res.json({ user });
      console.log(user);
      console.log("Authenticated?");
      console.log(req.isAuthenticated());
      // redirect client to URL with details as parameters
      //res.redirect('/success/auth?token=' + user.jwtToken + '&id=' + user._id);
      //res.redirect('/');
      //res.redirect('http://localhost:8080/auth-success.html' + user.jwtToken + '&id=' + user._id);
  });

router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.isAuthenticated());
    res.status(200).json({ message: "Successfully logged out" });
});

router.get('/user', (req, res) => {
        console.log('authRouter.get /user');
        var user = req.user;
        console.log(user);
        res.status(200).json(user);
        
});

router.get('/success', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/auth-success.html'));
});

module.exports = router;