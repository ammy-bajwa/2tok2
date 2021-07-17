var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
    res.redirect('home', { title: '1tok1' });
  }else{
  res.render('index', { title: '1tok1' });
  }
});

module.exports = router;
