exports.up = function (knex) {
  let createQuery = `CREATE TABLE transaction(
    id SERIAL PRIMARY KEY NOT NULL,
    userId SERIAL NOT NULL,
    ref TEXT,amount TEXT,
    type TEXT,
    currency TEXT,
    fee TEXT,
    status TEXT,
    createdAt TIMESTAMP,
    CONSTRAINT fk_user
    FOREIGN KEY(userId)
    REFERENCES users(id) ,
    CONSTRAINT ref_to UNIQUE(ref,userId)
    )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  let dropQuery = `DROP TABLE transaction`;
  return knex.raw(dropQuery);
};
