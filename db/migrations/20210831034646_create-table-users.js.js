exports.up = function (knex) {
  let createQuery = `CREATE TABLE users(
        id SERIAL PRIMARY KEY NOT NULL,
        email TEXT,
        username TEXT,
        token TEXT,
        private_key TEXT,
        admin BIT,
        verified BIT,
        active BIT,
        eth_block TEXT,
        password_digest TEXT,
        createdAt TIMESTAMP
      )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  let dropQuery = `DROP TABLE users`;
  return knex.raw(dropQuery);
};
