var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("/users api called");
  res.send(`respond with a resource , from ${__filename}`);
});

module.exports = router;
