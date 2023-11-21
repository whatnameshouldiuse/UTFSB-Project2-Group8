const router = require('express').Router();
const { Project } = require('../../models');

router.get('/', async (req, res) => {
    //TODO: Get all projects belonging to user in request session storage
    try {
        const UserProjects = Project.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        if (UserProjects.length == 0) {
            res.status(204).json({ message: 'No content is retrieved' });
            return;
        }

        res.status(200).json({ projects: UserProjects, message: 'User projects sucessfully retrieved' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const idNum = parseInt(req.params.id);
        const UserProject = Project.findOne({
            where: {
                id: idNum
            }
        });

        if (UserProject.length == 0) {
            res.status(204).json({ message: 'No content is retrieved' });
            return;
        }

        res.status(200).json(UserProject);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    //TODO: Create a new project for the user in request session storage
    try {
        const NewProject = await Project.create({
            name: req.body.name,
            user_id: req.session.user_id
        });

        res.status(200).json({ project: NewProject, message: 'Project successfully created' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    //TODO: Delete a project with the specified project id
    try {
        const deletingProject = await Project.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletingProject) {
            res.status(404).json({ message: 'No project found with specified id' });
            return;
        }

        res.status(200).json({ message: 'Project has been successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;