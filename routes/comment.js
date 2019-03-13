var express = require('express');
var router = express.Router();
const commentController = require("../controllers/comment");

router.post('/create', commentController.saveComment);

module.exports = router;