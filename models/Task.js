const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'New Task'
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterStart(value) {
                    
                }
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ['^#([A-Fa-f0-9]{6})$']
            }
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'project',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task'
    }
);

module.exports = Task;