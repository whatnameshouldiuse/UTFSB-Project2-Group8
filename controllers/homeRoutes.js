const router = require('express').Router();
const { User, Project, Task, Checkpoint } = require('../models');

router.get('/', async (req, res) => {
    //TODO: Render homepage, aka Project Dashboard
    // Use current user data to find projects to display
    // If not logged in, redirect to /login

    res.render('homepage');
});

router.get('/login', async (req, res) => {
    //TODO: login page
    // If there is a user data stored in the session already, redirect to homepage
});

router.get('/signup', async (req, res) => {
    //TODO: signup page
    // If there is a user data stored in the session already, redirect to homepage
});

router.get('/project/:id', async (req, res) => {
    //TODO: Display project based on the selected id
}); 

router.get('/stats', async (req, res) => {

    res.render('stats');
});



module.exports = router;