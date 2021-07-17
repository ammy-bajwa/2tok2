exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE transaction(
      id SERIAL PRIMARY KEY NOT NULL,
      userId SERIAL NOT NULL,
      ref TEXT,
      amount TEXT,
      type TEXT,
      currency TEXT,
      fee TEXT,
      status TEXT,
      createdAt TIMESTAMP,
      CONSTRAINT fk_user
      FOREIGN KEY(id) 
	    REFERENCES users(id)
    )`;
    return knex.raw(createQuery);
  };
  
  exports.down = function(knex, Promise) {
    let dropQuery = `DROP TABLE transaction`;
    return knex.raw(dropQuery);
  };