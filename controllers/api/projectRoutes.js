const router = require('express').Router();
const { Project } = require('../../models');

router.get('/', async (req, res) => {
    //TODO: Get all projects belonging to user in request session storage
});

router.post('/', async (req, res) => {
    //TODO: Create a new project for the user in request session storage
});

router.delete('/:id', async (req, res) => {
    //TODO: Delete a project with the specified project id
});

module.exports = router;