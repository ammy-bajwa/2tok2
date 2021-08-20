const database = require("../db");

const updateAdminSettings = (idleTimeLogout) => {
  return database.raw(
    "INSERT INTO admin_settings (modified_at, idle_time_logout) VALUES (?, ?) RETURNING id, idle_time_logout, modified_at",
    [new Date(), idleTimeLogout]
  );
};

const getLatestAdminSettings = () => {
  return database.raw(
    "SELECT * FROM admin_settings ORDER BY modified_at DESC LIMIT 1"
  );
};

module.exports = { updateAdminSettings, getLatestAdminSettings };
