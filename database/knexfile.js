const knex = require('knex')

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
      // directory: './migrations'
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

console.log(process.env.NODE || 'development')

module.exports = knex(CONFIG[process.env.NODE_ENV || 'development'])
