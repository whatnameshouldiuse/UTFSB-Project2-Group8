const router = require('express').Router();
const { Task } = require('../../models');

router.get('/:project_id', async (req, res) => {
    //TODO: Get all tasks belonging to requested project
})

router.post('/', async (req, res) => {
    //TODO: Create a new task using data and project id from request body
});

router.delete('/:id', async (req, res) => {
    //TODO: Delete a task with the specified id
})

module.exports = router;