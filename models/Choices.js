const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Choices extends Model {}

Choices.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    salads_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'salads',
        key: 'id'
      }
    },
    likes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'likes',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'choices'
  }
);

module.exports = Choices;