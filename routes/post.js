var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/post');

router.get('/create', post_controller.post_create);





module.exports = router;
