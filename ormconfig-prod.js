module.exports = {
  type: 'mysql',
  url: process.env.MYSQL_UNMSM_BANKING_NEST_URL,
  migrations: ['app/infra/migrations/*.js'],
  cli: {
    migrationsDir: './app/infra/migrations',
  },
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: ['**/command/infra/persistence/typeorm/entities/**.typeorm.js'],
};
