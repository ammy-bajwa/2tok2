var express = require('express');
var router = express.Router();
const database = require("../db");
var eth = require('../ethProvider')

router.get('/', function(req, res, next) {
    const userName = req.session?.loggedUser?.username
    console.log('req.session?.loggedUser?.id',req.session?.loggedUser)
    if(req.session.loggedIn){
        eth.syncBalance(req.session?.loggedUser?.token,req.session?.loggedUser?.id).then(()=>{
        database.raw("select type,currency,SUM (amount::numeric) as amount from transaction where userId = ? group by type,currency",[req.session?.loggedUser?.id])
        .then((data) => {
          const _rowsDebit = data?.rows?.filter(_r=>_r.type == 'debit')
          const _rowsCredit = data?.rows?.filter(_r=>_r.type == 'credit')
          let _data = {}
          _rowsCredit.map(_r=>{
            _data[_r.currency]=_r.amount 
          })
          _rowsDebit.map(_r=>{
            if(_data[_r.currency]){
            _data[_r.currency] = Number(_data[_r.currency] || 0) - Number(_r.amount)
            }else{
              _data[_r.currency] = 0 - Number(_r.amount)
            }
          })
          res.render("home", {
            data:_data,
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
      })
    }else{
    res.redirect('/');
    }
});

module.exports = router;