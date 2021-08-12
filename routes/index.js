const database = require("../db");
const eth = require("../ethProvider");
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
    this.express.get("/",  (req, res) =>{
      console.log('a')
      if (req.session.loggedIn) {
        console.log('b')
        res.redirect("home");
      } else {
        console.log('c')
        req.data = { title: "1tok1", layout: false }
        this.next.render(req, res,"/index",req.query);
      }
    });
    this.express.get("/trade", async  (req, res) =>{
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
          res.render("home/trade", {
            data: _data,
            tradeData: tradeData?.rows,
            userName,
            settings: global.settings?.[0],
            title: "trade",
            token: req.session?.loggedUser?.token,
            userId: req.session?.loggedUser?.id,
            isAdmin: req.session.isAdmin,
          });
        } catch (err) {
          res.render("home/trade", {
            data: [],
            tradeData: [],
            userName,
            title: "trade",
            isAdmin: req.session.isAdmin,
          });
          console.error(err);
        }
      } else {
        this.next.render(req, res,"/main",req.query);
      }
    });
    this.express.get("/history",  (req, res) =>{
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
                res.render("home/history", {
                  data: {
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: trade_data?.rows || [],
                  },
                  userName,
                  title: "history",
                  isAdmin: req.session.isAdmin,
                });
              })
              .catch((err) => {
                res.render("home/history", {
                  data: {
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: [],
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
        res.redirect("/");
      }
    });
    this.express.get("/admin/history",  (req, res) =>{
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
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: trade_data?.rows || [],
                  },
                  userName,
                  title: "AdminHistory",
                  isAdmin: req.session.isAdmin,
                });
              })
              .catch((err) => {
                res.render("home/adminhistory", {
                  data: {
                    deposits_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "credit"
                      ) || [],
                    withdrawals_data:
                      transaction_data?.rows?.filter(
                        (_d) => _d.type == "debit"
                      ) || [],
                    trade_data: [],
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
    this.express.get("/users",  (req, res) =>{
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
    this.express.get("/documents",  (req, res) =>{
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
    this.express.get("/news",  (req, res) =>{
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
    this.express.get("/settings",  (req, res) =>{
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
    this.express.get("/kyc",  (req, res) =>{
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
  }
}

module.exports = Routes;
