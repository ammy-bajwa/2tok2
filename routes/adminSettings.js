const { ADMIN_SETTINGS } = require("../constants/logs");
const {
  updateAdminSettings,
  getLatestAdminSettings,
} = require("../models/adminSettings");
const { logThis } = require("../models/logs");

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
    this.express.post("/admin-settings/post", function (req, res) {
      const { idleTimeLogout } = req.body;
      updateAdminSettings(idleTimeLogout)
        .then((data) => {
          logThis(ADMIN_SETTINGS, "Admin Settings Updated Sucessfully", true);
          res.json({ data });
        })
        .catch((err) => {
          logThis(ADMIN_SETTINGS, "Admin Settings Not Updated", false);
          catchHandler(err, res);
        });
    });

    this.express.get("/admin-settings/get", function (req, res) {
      getLatestAdminSettings()
        .then((data) => {
          console.log("Get Data: ", data);
          const latestSettings = data?.rows[0];
          if (latestSettings) {
            res.json({ latestSettings });
          } else {
            catchHandler("No admin settings record found", res);
          }
        })
        .catch((err) => catchHandler(err, res));
    });
  }
}

module.exports = Routes;
