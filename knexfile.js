module.exports = {
    development: {
       client: 'pg',
      connection: {
        connectionString: process.env.DATABASE_URL || 'postgres://wphcmvfwqsbenj:ec469db18a2a8e9e7245aefbd48bd5f053b6c8f5e60cac1e3e3080268b50b692@ec2-52-23-40-80.compute-1.amazonaws.com:5432/ddac2p8q7j62fs',
        ssl: { rejectUnauthorized: false },
      },
      pool: { min: 0, max: 200 },
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/dev'
      },
      useNullAsDefault: true
    },
  
    test: {
       client: 'pg',
       connection: {
        connectionString: process.env.DATABASE_URL || 'postgres://wphcmvfwqsbenj:ec469db18a2a8e9e7245aefbd48bd5f053b6c8f5e60cac1e3e3080268b50b692@ec2-52-23-40-80.compute-1.amazonaws.com:5432/ddac2p8q7j62fs?ssl=true',
        ssl: { rejectUnauthorized: false },
      },
      pool: { min: 0, max: 200 },
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/test'
      },
      useNullAsDefault: true
    },
  
    production: {
       client: 'pg',
       connection: {
        connectionString: process.env.DATABASE_URL || 'postgres://wphcmvfwqsbenj:ec469db18a2a8e9e7245aefbd48bd5f053b6c8f5e60cac1e3e3080268b50b692@ec2-52-23-40-80.compute-1.amazonaws.com:5432/ddac2p8q7j62fs?ssl=true',
        ssl: { rejectUnauthorized: false },
      },
      pool: { min: 0, max: 200 },
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/production'
      },
      useNullAsDefault: true
    }
  };