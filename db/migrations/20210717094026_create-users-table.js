exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE users(
      id SERIAL PRIMARY KEY NOT NULL,
      email TEXT,
      username TEXT,
      token TEXT,
      admin BIT,
      password_digest TEXT,
      createdAt TIMESTAMP
    )`;
    return knex.raw(createQuery);
  };
  
  exports.down = function(knex, Promise) {
    let dropQuery = `DROP TABLE users`;
    return knex.raw(dropQuery);
  };