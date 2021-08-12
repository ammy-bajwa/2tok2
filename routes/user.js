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
    this.express.get("/user/login",  (req, res) =>{
      if (req.session.loggedIn) {
        res.redirect("/home");
      } else {
        res.render("user/login", { layout: false });
      }
    });
    this.express.post("/user/login",  (req, res) =>{
      userModels.signin(req, res);
    });
    this.express.get("/user/register",  (req, res) =>{
      if (req.session.loggedIn) {
        res.redirect("/home");
      } else {
        res.render("user/register", { layout: false });
      }
    });
    this.express.post("/user/register",  (req, res) =>{
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
    this.express.get("/user/logout",  (req, res) =>{
      req.session.loggedIn = false;
      req.session.loggedUser = null;
      res.redirect("/");
    });
  }
}
module.exports = Routes;
