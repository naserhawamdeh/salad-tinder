const User = require('./User');
const Salads = require('./Salads');
const Choices = require('./Choices');

User.belongsToMany(Salads, {
  through: Choices,
  as: 'likes',
  foreignKey: 'user_id'
});

Salads.belongsToMany(User, {
  through: Choices,
  as: 'likes',
  foreignKey: 'salads_id'
});

Choices.belongsTo(Salads, {
  foreignKey: 'salads_id'
});

User.hasMany(Choices, {
  foreignKey: 'user_id'
});

Salads.hasMany(Choices, {
  foreignKey: 'salads_id'
});



module.exports = { User, Salads, Choices };