export default {
  'models-path': 'lib/models',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  seederStorage: 'sequelize',
}
