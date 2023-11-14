const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Checkpoint extends Model {}

Checkpoint.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'task',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'checkpoint'
    }
);

module.exports = Checkpoint;