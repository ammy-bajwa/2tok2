class NextjsExpressRouter {
  constructor(express, next) {
    this.express = express;
    this.next = next;
  }

  async init() {
    this.initApi();
    this.initRoutes();
    this.initHome();
    this.initUser();
    this.initErrors();
  }

  initApi() {
    return new (require("./routes/api.js"))(this.express).init();
  }

  initRoutes() {
    return new (require("./routes/index.js"))(this.express, this.next).init();
  }

  initHome() {
    return new (require("./routes/home.js"))(this.express, this.next).init();
  }

  initUser() {
    return new (require("./routes/user.js"))(this.express, this.next).init();
  }

  initErrors() {
    // catch 404 and forward to error handler
    this.express.use((req, res, next) => {
      const err = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    this.express.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.locals.error = err;
      res.locals.message = err.message;
      this.next.render(req, res, "/error", {});
    });
  }
}

module.exports = NextjsExpressRouter;
