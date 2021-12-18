const express = require('express');
const router = express.Router();
const pinsCtrl = require('../controllers/pins');

router.post('/photos/:photoId', pinsCtrl.create);
router.get('/pins/:photoId/:pinId', pinsCtrl.index);

module.exports = router;