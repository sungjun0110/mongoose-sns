var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/photos');
});
router.get('/auth/google', passport.authenticate(
  'google', 
  { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/photos',
    failureRedirect : '/photos'
  }
));
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/photos');
});

module.exports = router;
