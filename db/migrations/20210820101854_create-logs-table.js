exports.up = function (knex) {
  const createQuery = `CREATE TABLE logs(
          id SERIAL PRIMARY KEY NOT NULL,
          action TEXT,
          description TEXT,
          created_at TIMESTAMP,
          succeed BOOLEAN DEFAULT TRUE
        )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = `DROP TABLE logs`;
  return knex.raw(dropQuery);
};
