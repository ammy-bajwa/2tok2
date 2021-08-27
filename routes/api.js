const {
  SENDING_CURENCY,
  DEPOSIT_CURRENCY,
  WITHDRAW_CURRENCY,
  TRADE_CURRENCY,
} = require("../constants/logs");
const database = require("../db");
const eth = require("../ethProvider");
const { sendPasswordResetEmail } = require("../helpers/sendPasswordResetEmail");
const { validateToken } = require("../helpers/token");
// const {
//   updateAdminSettings,
//   getLatestAdminSettings,
// } = require("../models/adminSettings");

const { logThis } = require("../models/logs");
const { createToken } = require("../models/user");
const { store } = require("../store");

const catchHandler = (err, res, msg) => {
  res.json({ error: msg || "Something went wrong !", err });
  console.error(err);
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
                        logThis(
                          SENDING_CURENCY,
                          `${loggedUser?.email} user send ${amount}-${currency} to ${email} successfully`,
                          true
                        );
                      })
                      .catch((err) => {
                        logThis(
                          SENDING_CURENCY,
                          `${loggedUser?.email} user send ${amount}-${currency} to ${email} unsuccessful`,
                          false
                        );
                        catchHandler(err, res);
                      });
                  }
                })
                .catch((err) => {
                  logThis(
                    SENDING_CURENCY,
                    `${loggedUser?.email} user send ${amount}-${currency} to ${email} unsuccessful`,
                    false
                  );
                  catchHandler(err, res);
                });
            } else {
              logThis(
                SENDING_CURENCY,
                `${loggedUser?.email} user send ${amount}-${currency} to ${email} unsuccessful`,
                false
              );
              res.json({ error: "Invalid recipient!", err });
            }
          })
          .catch((err) => {
            logThis(
              SENDING_CURENCY,
              `${loggedUser?.email} user send ${amount}-${currency} to ${email} unsuccessful`,
              false
            );
            catchHandler(err, res, "Invalid Send to");
          });
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
            logThis(
              DEPOSIT_CURRENCY,
              `${loggedUser?.email} user deposit ${amount}-${currency} successful`,
              false
            );
            res.json({ ok: true });
          })
          .catch((err) => {
            logThis(
              DEPOSIT_CURRENCY,
              `${loggedUser?.email} user deposit ${amount}-${currency} unsuccessful`,
              false
            );
            catchHandler(err, res);
          });
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
                  logThis(
                    WITHDRAW_CURRENCY,
                    `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} successful`,
                    true
                  );
                })
                .catch((err) => {
                  logThis(
                    WITHDRAW_CURRENCY,
                    `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} Unsuccessful`,
                    false
                  );
                  catchHandler(err, res);
                });
            })
            .catch((err) => {
              logThis(
                WITHDRAW_CURRENCY,
                `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} Unsuccessful`,
                false
              );
              catchHandler(err, res);
            });
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
                  logThis(
                    WITHDRAW_CURRENCY,
                    `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} is successful`,
                    true
                  );
                })
                .catch((err) => {
                  logThis(
                    WITHDRAW_CURRENCY,
                    `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} is Unsuccessful`,
                    false
                  );
                  catchHandler(err, res);
                });
            })
            .catch((err) => {
              logThis(
                WITHDRAW_CURRENCY,
                `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} is Unsuccessful`,
                false
              );
              catchHandler(err, res);
            });
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
              logThis(
                WITHDRAW_CURRENCY,
                `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} is successful`,
                true
              );
            })
            .catch((err) => {
              logThis(
                WITHDRAW_CURRENCY,
                `${loggedUser?.email} user withdraw ${amount}-${currency} to ${address} is Unsuccessful`,
                false
              );
              catchHandler(err, res);
            });
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
            logThis(
              TRADE_CURRENCY,
              `${loggedUser?.email} user do trade and buy ${buyCurrency} and sell ${sellCurrency} is successfull`,
              true
            );
          })
          .catch((err) => {
            logThis(
              TRADE_CURRENCY,
              `${loggedUser?.email} user do trade and buy ${buyCurrency} and sell ${sellCurrency} is unsuccessfull`,
              false
            );
            catchHandler(err, res);
          });
      } else {
        logThis(
          TRADE_CURRENCY,
          `${loggedUser?.email} user do trade and buy ${buyCurrency} and sell ${sellCurrency} is unsuccessfull`,
          false
        );
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
          logThis(
            TRADE_CURRENCY,
            `${loggedUser?.email} user do trade and buy ${action?.buycurrency} and sell ${action?.sellcurrency} is successfull`,
            true
          );
          res.json({ ok: true });
        } catch (error) {
          catchHandler(error, res);
          logThis(
            TRADE_CURRENCY,
            `${loggedUser?.email} user do trade and buy ${action?.buycurrency} and sell ${action?.sellcurrency} is unsuccessfull`,
            false
          );
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

    this.express.get("/api/logs/get", function (req, res) {
      database
        .raw("SELECT * FROM logs LIMIT 6")
        .then((data) => {
          console.log("Get Data: ", data);
          res.json({ data });
        })
        .catch((err) => {
          console.error(err);
          catchHandler(err, res);
        });
    });

    this.express.post("/api/forget-password", (req, res) => {
      const { email } = req.body;
      database
        .raw("SELECT * FROM users WHERE email = ?", [email])
        .then((data) => data.rows[0])
        .then(async (data) => {
          console.log(data);
          if (!data) {
            res.json({ error: "User not found", success: false });
          } else {
            try {
              // create a token and save it
              let passwordResetToken = await createToken();
              passwordResetToken = passwordResetToken.replace("/", "");
              const tokenValue = {
                token: passwordResetToken,
                email,
                expirationTime: new Date(
                  new Date().getTime() + 2 * 60 * 1000
                ).getTime(),
                used: false,
              };
              store.setToken(passwordResetToken, tokenValue);
              const message = `Click here to reset you password <a href="http://localhost:3000/reset-password/${passwordResetToken}">Reset Password</a>`;
              await sendPasswordResetEmail(email, message);
              console.log("passwordResetToken: ", passwordResetToken);
              console.log("store: ", store.tokens);
              res.json({
                message: "Password reset email sended successfully",
                success: true,
              });
            } catch (error) {
              console.error(error);
              res
                .status(500)
                .json({ error: "Error sending password reset email" });
            }
          }
        });
    });

    this.express.post("/api/change-password", async (req, res) => {
      const { password, token } = req.body;
      try {
        // validateToken
        const { email } = await validateToken(token);
        console.log("email: ", email);
        // reset password of user here
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Token is invalid" });
      }
    });
  }
}

module.exports = Routes;
