var express = require('express');
var router = express.Router();

router.get('/', () => {
    console.log("hello")
});

module.exports = router;