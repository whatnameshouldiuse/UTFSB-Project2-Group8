const router = require('express').Router();
const { Task, Checkpoint } = require('../../models');

router.get('/:project_id', async (req, res) => {
    try {
        const ProjectTasks = await Task.findAll({
            where: {
                project_id: req.params.project_id
            },
            include: Checkpoint
        });

        if (ProjectTasks.length == 0) {
            res.status(204).json({ message: 'No content is retrieved' });
            return;
        }

        var projectCheckpoints = []
        ProjectTasks.forEach((task) => {
            task.Checkpoints.forEach((checkpoint) => {
                projectCheckpoints.push(checkpoint.id)
            })
        })

        if (projectCheckpoints.length == 0) {
            res.status(204).json({ message: 'No content is retrieved' });
            return;
        }

        res.status(200).json({ checkpoints: projectCheckpoints, message: 'Project tasks successfully retrieved' });
    } catch {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const NewCheckpoint = await Checkpoint.create({
            ...req.body,
            task_id: req.body.task_id
        });

        res.status(200).json({ checkpoint: NewCheckpoint, message: 'Checkpoint successfully created' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletingCheckpoint = await Checkpoint.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletingTask) {
            res.status(404).json({ message: 'No checkpoint found with specified id' });
            return;
        }

        res.status(200).json({ message: 'Checkpoint has been successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;