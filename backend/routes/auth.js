const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

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

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        user = await User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword
            });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, jwtSecret);

        res.status(201).json({ idToken: authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 'Message': 'Internal Server Error', isSuccess: false });
    }
});

// authenticate a user using GET "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be null').exists()
], async (req, res) => {

    // if there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        console.log(jwtSecret);
        const authToken = jwt.sign(data, jwtSecret);

        res.status(200).json({ idToken: authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ 'Message': 'Internal Server Error', isSuccess: false });
    }
});

// get logged-in user details using POST: '/api/auth/getuser'
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // req contains user which is coming from fetchuser middleware
        const userId = req.user.id;

        // '-password' inside select will select all columns except password
        const user = await User.findById(userId).select('-password');

        res.status(200).send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ 'Message': 'Internal Server Error', isSuccess: false });
    }
});


module.exports = router;