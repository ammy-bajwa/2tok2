const database = require("../db");

const logThis = (action, description, succeed) => {
  return new Promise((resolve, reject) => {
    database
      .raw(
        "INSERT INTO logs (action, description, succeed, created_at) VALUES (?, ?, ?, ?) RETURNING id, action, description, succeed, created_at",
        [action, description, succeed, new Date()]
      )
      .then(resolve)
      .catch(reject);
  });
};

module.exports = {
  logThis,
};
