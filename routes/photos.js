const express = require('express');
const router = express.Router();
const photosCtrl = require('../controllers/photos');
const isLoggedIn = require('../config/auth');

router.get('/photos', photosCtrl.index);
router.post('/photos/new', isLoggedIn, photosCtrl.new);

module.exports = router;