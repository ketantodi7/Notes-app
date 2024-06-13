const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// route 1 fetch note get request 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occurred");
    }
});

// route 2 add note post request
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            // const notes = await Notes.find({ user: req.user.id });
            const note = new Notes({ title, description, tag, user: req.user.id });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Error Occurred");
        }
    });

// route 3 update 
router.put('/updatenote/:id', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") };

            if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed To Access This Note") };


            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Error Occurred");
        }
    });

// route 4 delete note
router.delete('/deletenote/:id', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") };

            if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed To Access This Note") };


            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({ "Success": "note has been deleted" });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Error Occurred");
        }
    });
module.exports = router