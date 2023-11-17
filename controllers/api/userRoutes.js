const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    //TODO: Register a new user
    console.log(req.body)
    try {
        const userdata = await User.create(req.body);
        console.log("line 9",userdata)
req.session.save(()=>{
    req.session.user_id = userdata.id
    req.session.logged_in = true
    res.status(200).json(userdata)
})
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/login', async (req, res) => {
    //TODO: Log in using data from request body
    try {

    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/logout', async (req, res) => {
    //TODO: Log out from current user
});

module.exports = router;