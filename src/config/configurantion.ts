export default () => ({
  database: {
    type: process.env.type || 'postgres',
    host: process.env.host || 'localhost',
    database: process.env.database || 'postgres',
    username: process.env.username || 'postgres',
    password: process.env.password || '98@Develoment',
    port: process.env.port || 5432,
    migrationsRun: true,
    migrationsTableName: 'typeorm_migrations',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/**/*.js'],
  },
  jwt: {
    secret: process.env.secret || 'develoment-env',
    expiresIn: process.env.expiresIn || '7d',
  },
});
