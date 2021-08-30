module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString:
        process.env.DATABASE_URL ||
        "postgres://etfoafwfistqlv:05a994451e373142a25d4153ca3615d77596f362247673956c30704df0cec68d@ec2-44-196-8-220.compute-1.amazonaws.com:5432/d7mufq9thbcm9e",
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
        "postgres://etfoafwfistqlv:05a994451e373142a25d4153ca3615d77596f362247673956c30704df0cec68d@ec2-44-196-8-220.compute-1.amazonaws.com:5432/d7mufq9thbcm9e?ssl=true",
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
        "postgres://etfoafwfistqlv:05a994451e373142a25d4153ca3615d77596f362247673956c30704df0cec68d@ec2-44-196-8-220.compute-1.amazonaws.com:5432/d7mufq9thbcm9e?ssl=true",
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
