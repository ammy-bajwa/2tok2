var express = require('express');
const flash = require('express-flash');
var router = express.Router();
const userModels = require('../models/user')
/* GET users listing. */
router.get('/login', function(req, res, next) {
  //res.render('user/login')
  userModels.signin(req,res)
});

router.get('/register', function(req, res, next) {
  res.render('user/register')
});

router.post('/register', function(req, res, next) {
  const {password,confirmPassword} = req.body
  if(password == confirmPassword){
    userModels.signup(req,res)
    //res.render('user/register',{messages:{error:'ok'}})
  }else{
    res.render('user/register',{messages:{error:'Password not match!'}})
  }
});

module.exports = router;
