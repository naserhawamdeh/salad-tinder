const User = require('./User');
const Salads = require('./Salads');
const Choices = require('./Choices');
// const Likes = require('./Likes');

// User.hasMany(Likes, {
//   through: Choices,
//   as: 'likes',
//   foreignKey: 'user_id'
// });

// Salads.hasMany(Likes, {
//   through: Choices,
//   as: 'likes',
//   foreignKey: 'salads_id'
// });

// Likes.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Likes.belongsTo(Salads, {
//   foreignKey: 'salads_id'
// });

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