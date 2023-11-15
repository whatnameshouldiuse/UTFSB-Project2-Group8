const router = require('express').Router();
const { User } = require('../../models');

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