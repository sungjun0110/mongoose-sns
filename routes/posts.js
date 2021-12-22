const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');

router.post('/posts/:photoId', isLoggedIn, postsCtrl.create);
router.get('/posts/:photoId/:postId', postsCtrl.show);
router.delete('/posts/:photoId/:postId', isLoggedIn, postsCtrl.delete);

module.exports = router;