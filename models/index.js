const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Checkpoint = require('./Checkpoint');

User.hasMany(Project, {
    foreignKey: user_id,
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
});

Project.hasMany(Task, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(Project, {
    foreignKey: 'project_id'
});

Task.hasMany(Checkpoint, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});

Checkpoint.belongsTo(Task, {
    foreignKey: 'task_id'
});

module.exports = { User, Project, Task, Checkpoint };