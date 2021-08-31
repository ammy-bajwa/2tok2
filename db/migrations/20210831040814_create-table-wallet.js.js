exports.up = function (knex) {
  let createQuery = `CREATE TABLE wallet(
        id SERIAL PRIMARY KEY NOT NULL,
        userId SERIAL NOT NULL,
        currency TEXT,
        total TEXT,
        updatedAt TIMESTAMP,
        createdAt TIMESTAMP,
        CONSTRAINT fk_user
        FOREIGN KEY(id) 
          REFERENCES users(id)
      )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {};
