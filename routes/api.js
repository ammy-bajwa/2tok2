const database = require("../db");
const eth = require("../ethProvider");

const catchHandler = (err, res, msg) => {
  res.json({ error: msg || "Something went wrong !", err });
  //console.error(err);
};
class Routes {
  constructor(express) {
    this.express = express;    
  }

  init() {
    this.initRoutes();
  }
  initRoutes() {
    this.express.post("/api/send", function (req, res) {
      const loggedUser = req.session?.loggedUser;
      const { amount, currency, email } = req.body;
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
          })
          .catch((err) => catchHandler(err, res, "Invalid Send to"));
      } else {
        res.json({ error: "401" });
      }
    });

    this.express.post("/api/deposit", function (req, res) {
      const loggedUser = req.session?.loggedUser;
      const { amount, currency } = req.body;
      console.log("amount", req);
      console.log("loggedUser?.id", loggedUser?.id);
      if (req.session.loggedIn) {
        database
          .raw(
            "INSERT INTO transaction (amount,userId,type,currency,fee,status,createdAt) VALUES (?,?,?,?,?,?,?) RETURNING id",
            [
              amount,
              loggedUser?.id,
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
      } else {
        res.json({ error: "401" });
      }
    });

    this.express.post("/api/withdraw", function (req, res) {
      const loggedUser = req.session?.loggedUser;
      const { amount, currency, address } = req.body;

      if (req.session.loggedIn) {
        if (currency == "ETH") {
          eth
            .transferFund(address, amount)
            .then((_res) => {
              console.log("transfer_req", _res);
              database
                .raw(
                  "INSERT INTO transaction (ref,userId,amount, type, currency, fee,status,createdAt) VALUES (?,?,?, ?, ?, ?,?,?)",
                  [
                    _res?.id,
                    loggedUser?.id,
                    amount,
                    "debit",
                    currency,
                    0,
                    "ok",
                    new Date(),
                  ]
                )
                .then((data) => {
                  res.json({ ok: true });
                })
                .catch((err) => catchHandler(err, res));
            })
            .catch((err) => catchHandler(err, res));
        } else if (currency == "W1" || currency == "W2") {
          eth
            .transferToken(address, amount, currency)
            .then((_res) => {
              console.log("transfer_req", _res);
              database
                .raw(
                  "INSERT INTO transaction (ref,userId,amount, type, currency, fee,status,createdAt) VALUES (?,?,?, ?, ?, ?,?,?)",
                  [
                    _res?.id,
                    loggedUser?.id,
                    amount,
                    "debit",
                    currency,
                    0,
                    "ok",
                    new Date(),
                  ]
                )
                .then((data) => {
                  res.json({ ok: true });
                })
                .catch((err) => catchHandler(err, res));
            })
            .catch((err) => catchHandler(err, res));
        } else {
          database
            .raw(
              "INSERT INTO transaction (userId,amount, type, currency, fee,status,createdAt) VALUES (?,?, ?, ?, ?,?,?)",
              [
                loggedUser?.id,
                amount,
                "debit",
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
      } else {
        res.json({ error: "401" });
      }
    });

    this.express.post("/api/Exchange", function (req, res) {
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

    this.express.put("/api/trade/:action/:id", async function (req, res) {
      const loggedUser = req.session?.loggedUser;
      const { action, id } = req.params;
      if (req.session.loggedIn) {
        try {
          const data = await database.raw(
            "UPDATE trades SET status = ? WHERE id = ? RETURNING userid,buy,buycurrency,sell,sellcurrency,status",
            [action, id]
          );
          await database.raw(
            "INSERT INTO transaction (amount,userId,type,currency,fee,status,createdAt) VALUES (?,?,?,?,?,?,?) RETURNING id",
            [
              data.sell,
              loggedUser?.id,
              "debit",
              data.sellcurrency,
              0,
              "trade",
              new Date(),
            ]
          );
          await database.raw(
            "INSERT INTO transaction (amount,userId,type,currency,fee,status,createdAt) VALUES (?,?,?,?,?,?,?) RETURNING id",
            [
              data.buy,
              data.userid,
              "credit",
              data.buycurrency,
              0,
              "trade",
              new Date(),
            ]
          );
          res.json({ ok: true });
        } catch (error) {
          catchHandler(error, res);
        }
      } else {
        res.json({ error: "401" });
      }
    });

    this.express.put("/api/transaction/:action/:id", function (req, res) {
      const { action, id } = req.params;
      if (req.session.loggedIn && req.session.isAdmin) {
        database
          .raw(
            "UPDATE transaction SET status = ? WHERE id = ? RETURNING id,status",
            [action, id]
          )
          .then((data) => {
            res.json({ ok: true });
          })
          .catch((err) => catchHandler(err, res));
      } else {
        res.json({ error: "401" });
      }
    });
  }
}

module.exports = Routes;
