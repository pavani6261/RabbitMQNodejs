var express = require('express');
var router = express.Router();

// const {logger} = require('../log4')

var date = new Date();
console.log(date,"today");


const {logger,logfiles} = require('../log4');
logfiles();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index.js api called");
  res.render('index', { title: 'Express' });
});

module.exports = router;

logger.info(process.pid,"index.js",process.ppid)

