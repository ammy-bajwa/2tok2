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
    database.raw("select * from transaction where userId = ?",[req.session?.loggedUser?.id])
        .then((data) => {
          res.render("home/trade", {
            data:data?.rows,
            userName,
            title: "trade",
            isAdmin: req.session.isAdmin,
          });
        })
        .catch((err) => {
          res.render("home/trade", {
            data: [],
            userName,
            title: "trade",
            isAdmin: req.session.isAdmin,
          });
          console.error(err);
        });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});
router.get("/history", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    database
    .raw(
      "select * from transaction where userId = ?",[req.session?.loggedUser?.id]
    )
    .then((transaction_data) => {
      database
        .raw(
          "select * from trades where userId = ?",[req.session?.loggedUser?.id]
        )
        .then((trade_data) => {
          res.render("home/history", {
            data: {
              deposits_data:transaction_data?.rows?.filter(_d=>_d.type == 'credit') || [],
              withdrawals_data:transaction_data?.rows?.filter(_d=>_d.type == 'debit') || [],
              trade_data:trade_data?.rows || []
            },
            userName,
            title: "history",
            isAdmin: req.session.isAdmin,
          });
        })
        .catch((err) => {
          res.render("home/history", {
            data: {
              deposits_data:transaction_data?.rows?.filter(_d=>_d.type == 'credit') || [],
              withdrawals_data:transaction_data?.rows?.filter(_d=>_d.type == 'debit') || [],
              trade_data: []
            },
            userName,
            title: "history",
            isAdmin: req.session.isAdmin,
          });
          console.error(err);
        });
    })
    .catch((err) => {
      res.render("home/history", {
        data: [],
        userName,
        title: "history",
        isAdmin: req.session.isAdmin,
      });
      console.error(err);
    });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});
router.get("/admin/history", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    database
      .raw(
        "select transaction.*,users.username as username ,users.email as email from transaction join users on transaction.userId = users.id where transaction.status = 'pending';"
      )
      .then((transaction_data) => {
        database
          .raw(
            "select trades.*,users.username as username,users.email as email from trades join users on trades.userId = users.id where trades.status = 'pending';"
          )
          .then((trade_data) => {
            res.render("home/adminhistory", {
              data: {
                deposits_data:transaction_data?.rows?.filter(_d=>_d.type == 'credit') || [],
                withdrawals_data:transaction_data?.rows?.filter(_d=>_d.type == 'debit') || [],  
                trade_data:trade_data?.rows || []
              },
              userName,
              title: "AdminHistory",
              isAdmin: req.session.isAdmin,
            });
          })
          .catch((err) => {
            res.render("home/adminhistory", {
              data: {
                deposits_data:transaction_data?.rows?.filter(_d=>_d.type == 'credit') || [],
                withdrawals_data:transaction_data?.rows?.filter(_d=>_d.type == 'debit') || [],  
                trade_data: []
              },
              userName,
              title: "AdminHistory",
              isAdmin: req.session.isAdmin,
            });
            console.error(err);
          });
      })
      .catch((err) => {
        res.render("home/adminhistory", {
          data: [],
          userName,
          title: "AdminHistory",
          isAdmin: req.session.isAdmin,
        });
        console.error(err);
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
router.get("/documents", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    res.render("documents", {
      data: [],
      userName,
      title: "documents",
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});
router.get("/news", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    res.render("news", {
      data: [],
      userName,
      title: "news",
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});
router.get("/settings", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    res.render("settings", {
      data: [],
      userName,
      title: "settings",
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});
router.get("/kyc", function (req, res, next) {
  const userName = req.session?.loggedUser?.username;
  if (req.session.loggedIn) {
    res.render("kyc", {
      data: [],
      userName,
      title: "kyc",
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.render("index", { title: "1tok1", layout: false });
  }
});

module.exports = router;
