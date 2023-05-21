const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// create a user using POST "/api/auth/register".
router.post('/register', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password\'s length should at least be 5').isLength({ min: 5 })
], async (req, res) => {

    // if there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // check whether email already exists
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: 'User with same email already exists.' });
        }

        user = await User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

        res.status(201).json({ 'Message': 'Users created successfully', 'isSuccess': true });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 'Message': 'Some error occured', isSuccess: false });
    }
});

module.exports = router;