var express = require('express');
const flash = require('express-flash');
var router = express.Router();
const userModels = require('../models/user')
/* GET users listing. */
router.get('/login', function(req, res, next) {
  if(req.session.loggedIn ){
    res.redirect('/home')
  }else{
  res.render('user/login',{layout: false})
  }
});
router.post('/login', function(req, res, next) {
  userModels.signin(req,res)
});

router.get('/register', function(req, res, next) {
  if(req.session.loggedIn ){
    res.redirect('/home')
  }else{
    res.render('user/register',{layout: false})
  }
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
router.get('/logout', function(req, res, next) {
  req.session.loggedIn = false
  req.session.loggedUser = null
  res.redirect('/');
});

module.exports = router;
