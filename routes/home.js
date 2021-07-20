var express = require('express');
var router = express.Router();
const database = require("../db");

router.get('/', function(req, res, next) {
    const userName = req.session?.loggedUser?.username
    if(req.session.loggedIn){
        database.raw("select * from transaction where userId = ?",[req.session?.loggedUser?.id])
        .then((data) => {
          res.render("home", {
            data:data?.rows,
            userName,
            title: "home",
            isAdmin: req.session.isAdmin,
          });
        })
        .catch((err) => {
          res.render("home", {
            data: [],
            userName,
            title: "home",
            isAdmin: req.session.isAdmin,
          });
          console.error(err);
        });
    }else{
    res.redirect('/');
    }
});

module.exports = router;