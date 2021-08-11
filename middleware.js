const bodyParser = require('body-parser');
const path = require('path')
const favicon = require('serve-favicon');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

class Middleware {
  constructor(express) {
    this.express = express
  }

  async init() {
    
    this.express.use(favicon(path.join(__dirname, '..', 'public/images', 'favicon-32x32feac.png')));
    this.express.use(expressLayouts);
    // this.express.set("views", path.join(__dirname, "views"));
    // this.express.set("layout", "./layouts/full-width");
    // this.express.set("view engine", "ejs");

    this.express.use(logger("dev"));
    this.express.use(this.express.json());

    this.express.use(this.express.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(this.express.static(path.join(__dirname, "public")));

    this.express.use(
      session({
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: "true",
        secret: "secret",
      })
    );
    this.initErrors()
  }

  initErrors() {
    this.express.use(async (err, req, res, next) => {
      /* This will be the first error handler to be called */
      console.error("Unexpected error")
      return next(err)
    })
  }

}

module.exports = Middleware