const express = require('express');
const router = express.Router();
const photosCtrl = require('../controllers/photos');
const isLoggedIn = require('../config/auth');

router.get('/', photosCtrl.index);
router.get('/new', isLoggedIn, photosCtrl.new);
router.post('/', isLoggedIn, photosCtrl.create);
router.get('/:id', photosCtrl.show);
router.delete('/:id', isLoggedIn, photosCtrl.delete);

module.exports = router;