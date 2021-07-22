var express = require("express");
var router = express.Router();
const database = require("../db");

const catchHandler = (err, res,msg) => {
  res.json({ error: msg || "Something went wrong !", err });
  //console.error(err);
};

router.post("/send", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  const { amount, currency,email } = req.body;
  if (req.session.loggedIn) {
    database
      .raw("SELECT * FROM users WHERE email = ?", [email])
      .then((_data) => {
        if (_data?.rows?.length > 0) {
          database
            .raw(
              "INSERT INTO transaction (userId,amount, type, currency, fee,status,createdAt) VALUES (?,?, ?, ?, ?,?,?)",
              [
                loggedUser.id,
                amount,
                "debit",
                currency,
                0,
                "pending",
                new Date(),
              ]
            )
            .then((data) => {
              if (_data?.rows?.length > 0) {
                database
                  .raw(
                    "INSERT INTO transaction (userId,amount, type, currency, fee,status,createdAt) VALUES (?,?, ?, ?, ?,?,?)",
                    [
                      _data?.rows?.[0]?.id,
                      amount,
                      "credit",
                      currency,
                      0,
                      "pending",
                      new Date(),
                    ]
                  )
                  .then((data) => {
                    res.json({ ok: true });
                  })
                  .catch((err) => catchHandler(err, res));
              }
            })
            .catch((err) => catchHandler(err, res));
        } else {
          res.json({ error: "Invalid recipient!", err });
        }
      }).catch((err) => catchHandler(err, res,'Invalid Send to'));
  } else {
    res.json({ error: "401" });
  }
});

router.put("/send", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  if (req.session.loggedIn) {
    database
      .raw(
        "UPDATE transaction SET amount = ? WHERE id = ? RETURNING id,email,admin, username, token",
        [token, user.id]
      )
      .then((data) => data.rows[0])
      .catch((err) => {
        res.json({ error: "Something went wrong !", err });
        console.error(err);
      });
  } else {
    res.json({ error: "401" });
  }
});

router.post("/deposit", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  const { amount, currency } = req.body;
  console.log('amount',req)
  console.log('loggedUser?.id',loggedUser?.id)
  if (req.session.loggedIn) {
    database
      .raw(
        "INSERT INTO transaction (amount,userId,type,currency,fee,status,createdAt) VALUES (?,?,?,?,?,?,?) RETURNING id",
        [amount,loggedUser?.id,"credit",currency, 0, "pending", new Date()]
      )
      .then((data) => {
        res.json({ ok: true });
      })
      .catch((err) => catchHandler(err, res));
  } else {
    res.json({ error: "401" });
  }
});

router.put("/deposit", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  if (req.session.loggedIn) {
    console.log("req.session.isAdmin", req.session.isAdmin);
    res.render("home", {
      data: [],
      title: "home",
      userName,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.json({ error: "401" });
  }
});

router.post("/withdraw", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  const { amount, currency } = req.body;
  if (req.session.loggedIn) {
    database
      .raw(
        "INSERT INTO transaction (userId,amount, type, currency, fee,status,createdAt) VALUES (?,?, ?, ?, ?,?,?)",
        [loggedUser?.id, amount, "debit", currency, 0, "pending", new Date()]
      )
      .then((data) => {
        res.json({ ok: true });
      })
      .catch((err) => catchHandler(err, res));
  } else {
    res.json({ error: "401" });
  }
});

router.put("/withdraw", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  if (req.session.loggedIn) {
    console.log("req.session.isAdmin", req.session.isAdmin);
    res.render("home", {
      data: [],
      title: "home",
      userName,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.json({ error: "401" });
  }
});

router.post("/Exchange", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  const { buy, buyCurrency, sell, sellCurrency } = req.body;
  if (req.session.loggedIn) {
    database
      .raw(
        "INSERT INTO trades (userId,buy, buyCurrency, sell,sellCurrency, fee,status,createdAt) VALUES (?,?, ?, ?, ?,?,?,?)",
        [
          loggedUser?.id,
          buy,
          buyCurrency,
          sell,
          sellCurrency,
          0,
          "pending",
          new Date(),
        ]
      )
      .then((data) => {
        res.json({ ok: true });
      })
      .catch((err) => catchHandler(err, res));
  } else {
    res.json({ error: "401" });
  }
});

router.put("/Exchange", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  if (req.session.loggedIn) {
    console.log("req.session.isAdmin", req.session.isAdmin);
    res.render("home", {
      data: [],
      title: "home",
      userName,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.json({ error: "401" });
  }
});

module.exports = router;
