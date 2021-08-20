exports.up = function (knex) {
  let createQuery = `CREATE TABLE admin_settings(
    id SERIAL PRIMARY KEY NOT NULL,
    modified_at TIMESTAMP,
    idle_time_logout INT DEFAULT 2
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  let dropQuery = `DROP TABLE admin_settings`;
  return knex.raw(dropQuery);
};
