
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Salads extends Model {
  static like(body, models) {
    return models.Choices.create({
      user_id: body.user_id,
      salads_id: body.salads_id
    }).then(() => {
      return Salads.findOne({
        where: {
          id: body.salads_id
        },
        attributes: [
          'id',
          'name',
          'ingredients',
          'filename'
          [
            sequelize.literal('(SELECT COUNT(*) FROM choices WHERE salads.id = choices.salads_id'), 'likes'
          ]
        ]
      });
    });
  }
}

Salads.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'user',
    //     key: 'id'
    //   }
    // }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'salads'
  }
);

module.exports = Salads;

