var express = require('express');
var router = require('express').Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

// The root route renders our only view
router.get('/', function(req, res) {
  console.log(req.user);
  res.render('index', { user: req.user });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/splash', function (req,res,next) {
  res.render('splash', { user: req.user })
})


module.exports = router;
