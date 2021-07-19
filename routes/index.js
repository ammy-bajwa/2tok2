var express = require("express");
var router = express.Router();
const database = require("../db");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect("home");
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});

router.get("/trade", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    res.render("home/trade", {
      data: [],
      userName,
      title: "trade",
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});

router.get("/history", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    res.render("home/history", {
      data: [],
      userName,
      title: "history",
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});

router.get("/users", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    database
      .raw("SELECT * FROM users")
      .then((data) => {
        res.render("home/users", {
          data: data.rows,
          userName,
          title: "users",
          isAdmin: req.session.isAdmin,
        });
      })
      .catch((err) => {
        res.render("home/users", {
          data: [],
          userName,
          title: "users",
          isAdmin: req.session.isAdmin,
        });
        console.error(err);
      });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});

module.exports = router;
