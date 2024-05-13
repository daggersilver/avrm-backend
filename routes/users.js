const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../auth/auth');


router.get('/', auth.authorize, async (req, res) => {
    const users = await User.find({});

    res.render('users', {users});
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({rfid: req.params.id});
    
        if(user)
            return res.status(200).json({success: true, data: user});
        else
            throw new Error('user not found');
    } catch (error) {
        return res.status(500).json({success: false, error: error});
    }
})

module.exports = router;