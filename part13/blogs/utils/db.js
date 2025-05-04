const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'migrations',
  }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Database connected.');
  } catch (error) {
    console.error('Connecting to database failed:', error);
    return process.exit(1);
  }

  return null;
};

const rollbackMigration = async () => {
  try {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    await migrator.down();
  } catch (error) {
    console.error('Rollback failed:', error);
  }
};

module.exports = {
  connectToDatabase,
  sequelize,
  rollbackMigration,
};
