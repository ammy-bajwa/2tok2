const database = require("../db");
const eth = require("../ethProvider");
class Routes {
  constructor(express, next) {
    this.express = express;
    this.next = next;
  }

  init() {
    this.initRoutes();
  }
  initRoutes() {
    this.express.get("/logs", async (req, res) => {
      if (req.session.loggedIn && request.session.isAdmin) {
        this.next.render(req, res, "/logs", req.query);
      } else {
        res.redirect("/");
      }
    });
  }
}
module.exports = Routes;
