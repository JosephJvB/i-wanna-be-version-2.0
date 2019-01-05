const CONFIG = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'postgres',
      // YOUR DB NAME
      database: 'simple_dev'
    },
    migrations: {
      // directory: ''
    },
    seeds: {
      // directory: ''
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
module.exports = CONFIG[process.env.NODE || 'development']
