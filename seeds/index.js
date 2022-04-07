const sequelize = require('../config/connection');
const { Salads } = require('../models');
const seedSalads = require('./saladsData.json');

const seedDb = async () => {
  await sequelize.sync({ force: true });

  await Salads.bulkCreate(seedSalads, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDb();