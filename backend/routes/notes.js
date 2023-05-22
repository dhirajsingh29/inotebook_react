const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

const Note = require('../models/Note');

const router = express.Router();

// fetch all notes using GET: '/api/notes/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// add new note using POST: '/api/notes/addnote'
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 10 characters').isLength({ min: 5 })
], async (req, res) => {
    // if there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// update an existing note using PUT: '/api/notes/updatenote'
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 10 characters').isLength({ min: 5 })
], async (req, res) => {

    // if there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
        // create newNote object
        const newNote = {};

        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tag) {
            newNote.tag = tag;
        }

        // Find the note to be updated
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send('Note not found');
        }

        // check user sending request to update is the same user whom this note belongs to
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});

        res.status(200).json(note);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// delete an existing note using DELETE: '/api/notes/deletenote'
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try{
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send('Note not found');
        }

        // check user sending request to delete is the same user whom this note belongs to
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.json({'success': 'Note deleted', 'note': note});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;