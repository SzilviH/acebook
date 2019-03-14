var express = require('express');
var router = express.Router();
const commentController = require("../controllers/comment");

router.post('/create', commentController.saveComment);
router.get('/', commentController.allComments);

module.exports = router;
