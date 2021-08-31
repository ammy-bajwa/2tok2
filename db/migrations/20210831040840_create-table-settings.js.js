exports.up = function (knex) {
  let createQuery = `CREATE TABLE settings(
        id SERIAL PRIMARY KEY NOT NULL,
        min_margin INT DEFAULT 3,
        max_margin INT DEFAULT 10,
        order_auto_approve BOOLEAN DEFAULT TRUE
      )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {};
