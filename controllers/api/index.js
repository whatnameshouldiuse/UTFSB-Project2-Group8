const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');
const checkpointRoutes = require('./CheckpointRoutes');
const statsRoutes = require('./statsRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/checkpoint', checkpointRoutes);
router.use('/stats', statsRoutes);

module.exports = router;