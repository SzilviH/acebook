var express = require('express');
var router = express.Router();
var like_controller = require('../controllers/like');

router.get('/', like_controller.getLikes)

router.get('/create', like_controller.saveLike)

module.exports = router;
