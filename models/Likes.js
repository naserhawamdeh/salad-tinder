const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Likes extends Model {}

Likes.init(
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
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'likes'
    }
)


module.exports = Likes
