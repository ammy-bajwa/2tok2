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
    this.express.get("/home", async function (req, res) {
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
          res.render("home", {
            data: _data,
            userName,
            title: "home",
            isAdmin: req.session.isAdmin,
          });
        } catch (error) {
          res.render("home", {
            data: [],
            userName,
            title: "home",
            isAdmin: req.session.isAdmin,
          });
          console.error(err);
        }
      } else {
        res.redirect("/");
      }
    });
  }
}
module.exports = Routes;
