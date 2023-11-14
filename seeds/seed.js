const sequelize = require('../config/connection');
const { User, Project, Task, Checkpoint } = require('../models');

const userData = require('./userData.json');
const exampleProject = require('./exampleProject.json');
const exampleTask = require('./exampleTasks.json');
const exampleCheckpoint = require('./exampleCheckpoint.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true
    });

    for (const project of exampleProject) {
        await Project.create({...project});
    }

    for (const task of exampleTask) {
        await Task.create({...task});
    }

    for (const checkpoint of exampleCheckpoint) {
        await Checkpoint.create({...checkpoint});
    }

    process.exit(0);
};

seedDatabase();