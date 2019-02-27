var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { url: '/oauth/authorize?'+req.url.substr(2) });
});

module.exports = router;
