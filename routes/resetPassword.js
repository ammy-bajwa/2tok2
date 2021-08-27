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
    this.express.get("/reset-password/:token", async (req, res) => {
      console.log("Here----------------");
      this.next.render(req, res, "/resetPassword", req.query);
    });
  }
}
module.exports = Routes;
