var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/post');

router.get('/', post_controller.post_show);

router.get('/test', post_controller.post_create_user);

module.exports = router;
