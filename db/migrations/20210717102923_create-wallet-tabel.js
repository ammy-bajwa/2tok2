exports.up = function(knex, Promise) {
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
  
  exports.down = function(knex, Promise) {
    let dropQuery = `DROP TABLE wallet`;
    return knex.raw(dropQuery);
  };