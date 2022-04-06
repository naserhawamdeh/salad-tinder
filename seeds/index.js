const sequelize = require('../config/connection');
const seedSalads = require('./saladsData');

const seedDb = async () => {
  await sequelize.sync({ force: true });

  await seedSalads();

  process.exit(0);
};

seedDb();