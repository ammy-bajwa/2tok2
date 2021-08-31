module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString:
        process.env.DATABASE_URL ||
        "postgres://otlqwwznmpbsbn:c6112ff19acd42f6e3f7967c8a7c777b96175d44dc93cd866bf6a1dd830470cc@ec2-52-2-118-38.compute-1.amazonaws.com:5432/d4jdsu9d2346ll",
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 200 },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/dev",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "pg",
    connection: {
      connectionString:
        process.env.DATABASE_URL ||
        "postgres://otlqwwznmpbsbn:c6112ff19acd42f6e3f7967c8a7c777b96175d44dc93cd866bf6a1dd830470cc@ec2-52-2-118-38.compute-1.amazonaws.com:5432/d4jdsu9d2346ll?ssl=true",
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 200 },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/test",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: {
      connectionString:
        process.env.DATABASE_URL ||
        "postgres://otlqwwznmpbsbn:c6112ff19acd42f6e3f7967c8a7c777b96175d44dc93cd866bf6a1dd830470cc@ec2-52-2-118-38.compute-1.amazonaws.com:5432/d4jdsu9d2346ll?ssl=true",
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 200 },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/production",
    },
    useNullAsDefault: true,
  },
};
