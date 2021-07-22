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

router.put("/trade/:action/:id", function (req, res, next) {
  const loggedUser = req.session?.loggedUser;
  const {action,id} = req.params
  if (req.session.loggedIn) {
    database.raw("UPDATE trades SET status = ? WHERE id = ? RETURNING id,status",[action,id])
      .then((data) => {
        res.json({ ok: true });
      })
      .catch((err) => catchHandler(err, res));
  } else {
    res.json({ error: "401" });
  }
});
router.put("/transaction/:action/:id", function (req, res, next) {
  const {action,id} = req.params
  if (req.session.loggedIn && req.session.isAdmin) {
    database.raw("UPDATE transaction SET status = ? WHERE id = ? RETURNING id,status",[action,id])
      .then((data) => {
        res.json({ ok: true });
      })
      .catch((err) => catchHandler(err, res));
  } else {
    res.json({ error: "401" });
  }
});



module.exports = router;
