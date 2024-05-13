const express = require('express');
const router = express.Router();

const User = require('../models/User');
const auth = require('../auth/auth');

router.get('/', auth.authorize, (req, res) => {
    res.render('register');
});

router.post('/', auth.authorize, async (req, res) => {
    const factor = (req.body.familyIncome < 50000 ? 8 : 5);

    const user = new User({...req.body, 
        wheatAllotment: parseInt(req.body.familySize) * factor,
        riceAllotment: parseInt(req.body.familySize) * factor,
    });

    console.log(user)

    await user.save();

    res.redirect('/register');
})

module.exports = router;