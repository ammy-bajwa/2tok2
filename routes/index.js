const database = require("../db");
const eth = require("../ethProvider");
const { getLogsData } = require("../models/logs");
class Routes {
  constructor(express, next) {
    this.express = express;
    this.next = next;
  }

  init() {
    this.initRoutes();
  }
  initRoutes() {
    /* GET home page. */
    this.express.get("/", (req, res) => {
      if (req.session.loggedIn) {
        res.redirect("home");
      } else {
        req.locals = { title: "1tok1", layout: false };
        this.next.render(req, res, "/index", req.query);
      }
    });
    this.express.get("/trade", async (req, res) => {
      const userName = req.session?.loggedUser?.username;
      if (req.session.loggedIn) {
        try {
          await eth.syncBalance(
            req.session?.loggedUser?.token,
            req.session?.loggedUser?.id
          );
          const data = await database.raw(
            "select type,currency,SUM (amount::numeric) as amount from transaction where userId = ? group by type,currency",
            [req.session?.loggedUser?.id]
          );
          const tradeData = await database.raw(
            "select trades.*,users.username as username,users.email as email from trades join users on trades.userId = users.id where trades.status = 'pending';"
          );
          const _rowsDebit = data?.rows?.filter((_r) => _r.type == "debit");
          const _rowsCredit = data?.rows?.filter((_r) => _r.type == "credit");
          let _data = {};
          _rowsCredit.map((_r) => {
            _data[_r.currency] = _r.amount;
          });
          _rowsDebit.map((_r) => {
            if (_data[_r.currency]) {
              _data[_r.currency] =
                Number(_data[_r.currency] || 0) - Number(_r.amount);
            } else {
              _data[_r.currency] = 0 - Number(_r.amount);
            }
          });
          console.log("tradeData?.rows", tradeData?.rows);
          req.locals = {
            data: JSON.stringify(_data || {}),
            tradeData: JSON.stringify(tradeData?.rows || []),
            userName,
            settings: JSON.stringify(global.settings?.[0]),
            title: "trade",
            token: req.session?.loggedUser?.token,
            userId: req.session?.loggedUser?.id,
            isAdmin: req.session.isAdmin,
          };
          this.next.render(req, res, "/home/trade", req.query);
        } catch (err) {
          req.locals = {
            data: JSON.stringify([]),
            tradeData: JSON.stringify([]),
            userName,
            title: "trade",
            isAdmin: req.session.isAdmin,
          };
          this.next.render(req, res, "/home/trade", req.query);
          console.error(err);
        }
      } else {
        res.redirect("/");
      }
    });
    this.express.get("/history", (req, res) => {
      const userName = req.session?.loggedUser?.username;
      if (req.session.loggedIn) {
        database
          .raw("select * from transaction where userId = ?", [
            req.session?.loggedUser?.id,
          ])
          .then((transaction_data) => {
            database
              .raw("select * from trades where userId = ?", [
                req.session?.loggedUser?.id,
              ])
              .then((trade_data) => {
                req.locals = {
                  data: JSON.stringify({
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: trade_data?.rows || [],
                  }),
                  userName,
                  title: "history",
                  isAdmin: req.session.isAdmin,
                };
                this.next.render(req, res, "/home/history", req.query);
              })
              .catch((err) => {
                req.locals = {
                  data: JSON.stringify({
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: [],
                  }),
                  userName,
                  title: "history",
                  isAdmin: req.session.isAdmin,
                };
                this.next.render(req, res, "/home/history", req.query);
                console.error(err);
              });
          })
          .catch((err) => {
            req.locals = {
              data: JSON.stringify([]),
              userName,
              title: "history",
              isAdmin: req.session.isAdmin,
            };
            this.next.render(req, res, "/home/history", req.query);
            console.error(err);
          });
      } else {
        res.redirect("/");
      }
    });
    this.express.get("/admin/history", (req, res) => {
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
                req.locals = {
                  data: JSON.stringify({
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: trade_data?.rows || [],
                  }),
                  userName,
                  title: "AdminHistory",
                  isAdmin: req.session.isAdmin,
                };
                this.next.render(req, res, "/home/adminhistory", req.query);
              })
              .catch((err) => {
                req.locals = {
                  data: JSON.stringify({
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: [],
                  }),
                  userName,
                  title: "AdminHistory",
                  isAdmin: req.session.isAdmin,
                };
                this.next.render(req, res, "/home/adminhistory", req.query);
                console.error(err);
              });
          })
          .catch((err) => {
            req.locals = {
              data: JSON.stringify([]),
              userName,
              title: "AdminHistory",
              isAdmin: req.session.isAdmin,
            };
            this.next.render(req, res, "/home/adminhistory", req.query);
            console.error(err);
          });
      } else {
        res.redirect("/");
      }
    });
    this.express.get("/users", (req, res) => {
      const userName = req.session?.loggedUser?.username;
      if (req.session.loggedIn) {
        database
          .raw("SELECT * FROM users")
          .then((data) => {
            req.locals = {
              data: JSON.stringify(data.rows),
              userName,
              title: "users",
              isAdmin: req.session.isAdmin,
            };
            this.next.render(req, res, "/home/users", req.query);
          })
          .catch((err) => {
            req.locals = {
              data: JSON.stringify([]),
              userName,
              title: "users",
              isAdmin: req.session.isAdmin,
            };
            this.next.render(req, res, "/home/users", req.query);
            console.error(err);
          });
      } else {
        res.redirect("/");
      }
    });
    this.express.get("/documents", (req, res) => {
      const userName = req.session?.loggedUser?.username;
      if (req.session.loggedIn) {
        req.locals = {
          data: [],
          userName,
          title: "documents",
          isAdmin: req.session.isAdmin,
        };
        this.next.render(req, res, "documents", req.query);
      } else {
        res.redirect("/");
      }
    });
    this.express.get("/news", (req, res) => {
      const userName = req.session?.loggedUser?.username;
      if (req.session.loggedIn) {
        req.locals = {
          data: [],
          userName,
          title: "news",
          isAdmin: req.session.isAdmin,
        };
        this.next.render(req, res, "news", req.query);
      } else {
        res.redirect("/");
      }
    });
    this.express.get("/settings", (req, res) => {
      const userName = req.session?.loggedUser?.username;
      if (req.session.loggedIn) {
        req.locals = {
          data: [],
          userName,
          title: "settings",
          isAdmin: req.session.isAdmin,
        };
        this.next.render(req, res, "/settings", req.query);
      } else {
        res.redirect("/");
      }
    });
    this.express.get("/kyc", (req, res) => {
      const userName = req.session?.loggedUser?.username;
      if (req.session.loggedIn) {
        req.locals = {
          data: [],
          userName,
          title: "kyc",
          isAdmin: req.session.isAdmin,
        };
        this.next.render(req, res, "/kyc", req.query);
      } else {
        res.redirect("/");
      }
    });

    this.express.get("/logs", async (req, res) => {
      const userName = req.session?.loggedUser?.username;
      const isAdmin = req.session?.loggedUser?.admin;
      if (req.session.loggedIn && isAdmin) {
        try {
          const logsData = await getLogsData();
          console.log("logsData: ", logsData);
          req.locals = {
            data: JSON.stringify(logsData),
            userName,
            title: "logs",
            isAdmin: req.session.isAdmin,
          };
        } catch (error) {
          console.log("error logs: ", error);
          req.locals = {
            data: error,
            userName,
            title: "logs",
            isAdmin: req.session.isAdmin,
          };
        }
        this.next.render(req, res, "/logs", req.query);
      } else {
        res.redirect("/");
      }
    });
  }
}

module.exports = Routes;
