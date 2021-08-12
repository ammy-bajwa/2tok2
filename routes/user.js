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
        this.next.render(req, res,"/user/login", req.query);
      }
    });
    this.express.post("/user/login",  (req, res) =>{
      userModels.signin(req, res,this.next);
    });
    this.express.get("/user/register",  (req, res) =>{
      if (req.session.loggedIn) {
        res.redirect("/home");
      } else {
        this.next.render(req, res,"/user/register", req.query);
      }
    });
    this.express.post("/user/register",  (req, res) =>{
      const { password, confirmPassword } = req.body;
      if (password == confirmPassword) {
        userModels.signup(req, res,this.next);
        //this.next.render('user/register',{messages:{error:'ok'}})
      } else {
        req.locals.messages = { error: "Password not match!" }
        this.next.render(req, res,"/user/register", req.query);
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
