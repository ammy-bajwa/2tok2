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
    this.initAdminSettings();
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

  initAdminSettings() {
    return new (require("./routes/adminSettings.js"))(
      this.express,
      this.next
    ).init();
  }

  initErrors() {
    this.express.use((req, res, next) => {
      const err = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    this.express.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.locals.error = err;
      res.locals.errorDescription = err.message;
      this.next.render(req, res, "/_error", {});
    });
  }
}

module.exports = NextjsExpressRouter;
