var express = require('express');
var router = express.Router();
var like_controller = require('../controllers/like');

router.get('/', like_controller.show_like)
//     console.log("hello im in the routes")
// });

router.get('/create', like_controller.like_create)

module.exports = router;
