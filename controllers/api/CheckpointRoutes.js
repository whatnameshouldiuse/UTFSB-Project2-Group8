const router = require('express').Router();
const { Checkpoint } = require('../../models');

router.get('/:project_id', async (req, res) => {
    //TODO: Get all checkpoints belonging to all tasks in a specified project
});

router.post('/', async (req, res) => {
    //TODO: Create a checkpoint using data and task id from the request body
});

router.delete('/:id', async (req, res) => {
    //TODO: Delete a specified checkpoint
})

module.exports = router;