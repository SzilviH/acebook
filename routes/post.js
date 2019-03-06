var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/post');

router.get('/create', post_controller.post_create);

router.get('/', post_controller.post_show);



module.exports = router;
