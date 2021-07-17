exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE trades(
      id SERIAL PRIMARY KEY NOT NULL,
      userId SERIAL NOT NULL,
      buy TEXT,
      buyCurrency TEXT,
      sell TEXT,
      sellCurrency TEXT,
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
    let dropQuery = `DROP TABLE trades`;
    return knex.raw(dropQuery);
  };