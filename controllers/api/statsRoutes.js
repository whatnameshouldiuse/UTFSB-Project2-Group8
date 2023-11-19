const router = require('express').Router();
const { User, Project, Task } = require('../../models');

router.get('/user/:id', async (req, res) => {
    console.log("/stats/user/:id");
    console.log(req.session);
    console.log(req.params.id);    
    
    try {
        const userData = await User.findAll({

        });

        console.log(userData);
        const user = userData.get({plain: true});
    
        console.log(user);
        console.log(...user);        

        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
});


router.get('/project/:id', async (req, res) => {
    //TODO: Register a new user

    console.log("/stats/project/:id");
    console.log(req.session);
    console.log(req.params);

    try {
        const projectData = await Project.findAll({
            where: {user_id: parseInt(req.params.id)},
            include: [{model: Task}],
        });

        const projects = projectData.map( (project) => project.get({plain: true}));
    
        res.status(200).json(projects);
      } catch (err) {
        res.status(500).json(err);
      }
});


router.post('/', async (req, res) => {
    //TODO: Register a new user
});

router.post('/login', async (req, res) => {
    //TODO: Log in using data from request body
});

router.post('/logout', async (req, res) => {
    //TODO: Log out from current user
});

module.exports = router;