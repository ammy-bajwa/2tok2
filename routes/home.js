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
    this.express.get("/home", async (req, res) => {
      console.log("req.session?.loggedUser: ", req.session?.loggedUser);
      const userName = req.session?.loggedUser?.username;
      console.log("req.session?.loggedUser?.id", req.session?.loggedUser);
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
          const trade_data = await database.raw(
            "select sellCurrency as currency,SUM (sell::numeric) as amount from trades where userId = ? and status = 'pending' group by sellCurrency",
            [req.session?.loggedUser?.id]
          );
          console.log('trade_data',trade_data?.rows)
          console.log("data/home", data);
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
          let _availableData = {..._data};
          trade_data.map((_r) => {
            if (_availableData[_r.currency]) {
              _availableData[_r.currency] =
                Number(_availableData[_r.currency] || 0) - Number(_r.amount);
            } else {
              _availableData[_r.currency] = 0 - Number(_r.amount);
            }
          });
          req.locals = {
            data: JSON.stringify(_data),
            availableData:JSON.stringify(_availableData),
            userName,
            title: "home",
            isAdmin: req.session.isAdmin,
          };
          this.next.render(req, res, "/home", req.query);
        } catch (error) {
          req.locals = {
            data: [],
            userName,
            title: "home",
            isAdmin: req.session.isAdmin,
          };
          this.next.render(req, res, "/home", req.query);
          console.error(error);
        }
      } else {
        res.redirect("/");
      }
    });
  }
}
module.exports = Routes;
