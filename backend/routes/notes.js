const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// fetch all notes using GET: '/api/
router.get('/fetchallnotes', fetchuser, (req, res) => {
    res.json([]);
});

module.exports = router;