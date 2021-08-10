var express = require("express");
const flash = require("express-flash");
const router = express.Router();
const userModels = require("../models/user");
/* GET users listing. */
class Routes {
  constructor(express, next) {
    this.express = express;
    this.next = next;
  }

  init() {
    this.initRoutes();
  }
  initRoutes() {
    router.get("/user/login", function (req, res) {
      if (req.session.loggedIn) {
        res.redirect("/home");
      } else {
        res.render("user/login", { layout: false });
      }
    });
    router.post("/user/login", function (req, res) {
      userModels.signin(req, res);
    });
    router.get("/user/register", function (req, res) {
      if (req.session.loggedIn) {
        res.redirect("/home");
      } else {
        res.render("user/register", { layout: false });
      }
    });
    router.post("/user/register", function (req, res) {
      const { password, confirmPassword } = req.body;
      if (password == confirmPassword) {
        userModels.signup(req, res);
        //res.render('user/register',{messages:{error:'ok'}})
      } else {
        res.render("user/register", {
          messages: { error: "Password not match!" },
        });
      }
    });
    router.get("/user/logout", function (req, res) {
      req.session.loggedIn = false;
      req.session.loggedUser = null;
      res.redirect("/");
    });
  }
}
module.exports = Routes;
