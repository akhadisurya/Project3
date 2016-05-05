var router = require('express').Router();
var chatsCtrl = require('../controllers/chats');

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

//get API
router.get('/chats', chatsCtrl.index);


module.exports = router;
