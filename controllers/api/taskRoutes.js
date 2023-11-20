const router = require('express').Router();
const { Task } = require('../../models');

router.get('/:project_id', async (req, res) => {
    try {
        const ProjectTasks = await Task.findAll({
            where: {
                project_id: req.params.project_id
            }
        });

        if (ProjectTasks.length == 0) {
            res.status(204).json({ message: 'No content is retrieved' });
            return;
        }

        res.status(200).json({ tasks: ProjectTasks, message: 'Project tasks successfully retrieved' });
    } catch {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const NewTask = await Task.create({
            ...req.body,
            project_id: req.body.project_id
        });

        res.status(200).json({ task: NewTask, message: 'Task successfully created' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletingTask = await Task.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletingTask) {
            res.status(404).json({ message: 'No task found with specified id' });
            return;
        }

        res.status(200).json({ message: 'Task has been successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;