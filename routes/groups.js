const express = require('express');
const router = express.Router();
const groupsCtrl = require('../controllers/groups');

router.post('/photos/:photoId', groupsCtrl.create);

module.exports = router;